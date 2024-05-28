import db from "@/app/libs/db";
import { getCurrentuser } from "./get-currentuser"

export const getConversations = async () => {
    const currentUser = await getCurrentuser();

    if (!currentUser) {
        return [];
    };

    try {
        const conversations = await db.conversation.findMany({
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seenBy: true,
                    }
                },
            }
        });

        return conversations;
    } catch (error: any) {
        return [];
    }
};