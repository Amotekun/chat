import { getCurrentuser } from "@/app/actions/get-currentuser";
import db from "@/app/libs/db";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    {params}: {params: {conversationId?: string}}
) {
    try {
        const currentUser = await getCurrentuser();

        const {conversationId} = params;

        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        //Find the existing conversation
        const conversation = await db.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: {
                        seenBy: true
                    },
                },
                users: true,
            },
        });

        if (!conversation) {
            return new NextResponse("Invalid ID", {status: 400})
        }

        //Find last message
        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) {
            return NextResponse.json(conversation);
        };

        // Update the seenBy array with the current user's last message
        const updatedMessage = await db.message.update({
            where: {
                id: lastMessage.id
            },
            data: {
                seenBy: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                sender: true,
                seenBy: true
            }
        });

        // Update all the connections with the new seen.
        await pusherServer.trigger(currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [updatedMessage]
        });

        // If the user has already seen the message, no need execute the next line of code.
        if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
            return NextResponse.json(conversation);
        }

        // Update last seen message
        await pusherServer.trigger(conversationId!, 'message:update', updatedMessage)

        return new NextResponse("Success");
    } catch (error) {
        console.log("ERROR_MESSAGE_SEEN", error);
        return new NextResponse("Error", {status: 500});
    }
}