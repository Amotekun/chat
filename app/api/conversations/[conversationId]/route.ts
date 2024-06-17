import { getCurrentuser } from "@/app/actions/get-currentuser";
import db from "@/app/libs/db";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    {params}: {params: {conversationId: string}}
) {
    try {
        const {conversationId} = params;
        const currentUser = await getCurrentuser();

        if (!currentUser?.id) {
            return NextResponse.json(null)
        } 

        const existingConversation = await db.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        });

        if (!existingConversation) {
            return new NextResponse('Invalid ID', {status: 400})
        }

        const deleteConversation = await db.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                },
            },
        });

        existingConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:delete', existingConversation);
            }
        });

        return NextResponse.json(deleteConversation)
    } catch (error) {
        console.log("CONVERSATION_DELETE", error);
        return NextResponse.json(null)
    }
}