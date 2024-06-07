import { getCurrentuser } from "@/app/actions/get-currentuser";
import db from "@/app/libs/db";
import { NextResponse } from "next/server";

 export async function POST(
    req: Request,
 ) {
    try {
        
        const currentUser = await getCurrentuser();
        const body = await req.json();
        const {
            userId,
            isGroup,
            members,
            name,
        } = body;
    
        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse("Unauthorized", {status: 400})
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("Group not found", {status: 400})
        }

        if (isGroup) {
            const newGroupConversation = await db.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            {id: currentUser.id},
                            ...members.map((member: {value: string}) => ({
                                id: member.value
                            }))
                        ]
                    }
                }
            })

            return NextResponse.json(newGroupConversation)
        }
    
        const existingConversations = await db.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        });
    
        const singleConversation = existingConversations[0];
    
        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }
    
        const newConversation = await db.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        })
    
        return NextResponse.json(newConversation)
    } catch (error) {
        console.log("CONVERSATION_POST", error)
        return new NextResponse("Internal Error", {status: 500});
    }
 }