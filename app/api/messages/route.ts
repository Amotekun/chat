import { getCurrentuser } from "@/app/actions/get-currentuser"
import db from "@/app/libs/db";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const currentUser = await getCurrentuser();
        const body = await req.json();

        const {
            message,
            image,
            conversationId,
        } = body;

        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const newMessage = await db.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seenBy: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seenBy: true,
                sender: true
            },
        });

        const updatedConversation = await db.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seenBy: true,
                    }
                },
            },
        });

        await pusherServer.trigger(conversationId, 'message:new', newMessage);

        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

        updatedConversation.users.map((user) => {
            pusherServer.trigger(user.email!, 'conversation:update', {
                id: conversationId,
                messages: [lastMessage]
            })
        })


        return NextResponse.json(newMessage)
    } catch (error) {
        console.log("MESSAGE_ERROR", error);
        return new NextResponse("Error", {status: 500});
    };
};
