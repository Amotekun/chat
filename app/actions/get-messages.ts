import db from "@/app/libs/db";

export const getMessages = async (conversationId: string) => {
    try {
        const messages = await db.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                sender: true,
                seenBy: true,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return messages;
    } catch (error: any) {
        return [];
    };
};