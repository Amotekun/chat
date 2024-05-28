import db from "@/app/libs/db";
import { getCurrentuser } from "./get-currentuser";

export const getConversationById = async (conversationId: string) => {
    try {
        const currentUser = await getCurrentuser();

        if (!currentUser?.email) {
            return null;
        }

        const conversation = await db.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true,
            },
        });

        return conversation;
    } catch (error: any) {
        console.log(error, "SERVER_ERROR")
        return null;
    }
}