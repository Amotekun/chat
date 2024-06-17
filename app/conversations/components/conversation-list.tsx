"use client";

import { FullConversationType } from "@/app/types";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { ConversationBox } from "./conversation-box";
import { useConversation } from "@/hooks/use-conversation";
import clsx from "clsx";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { GroupChatModal } from "@/components/modals/group-chat-modal";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
    title?: string;
};

export const ConversationList: React.FC<ConversationListProps> = ({
    initialItems,
    users,
}) => {
    const {conversationId, isOpen} = useConversation();

    const router = useRouter();
    const session = useSession();


    const [items, selectedItem] = useState(initialItems);
    const [GroupModalOpen, IsGroupModalOpen] = useState(false);

    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email])

    useEffect(() => {
        if(!pusherKey) return;

        pusherClient.subscribe(pusherKey);

        const updateHandler = (conversation: FullConversationType) => {
            selectedItem((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages,
                    }
                }

                return currentConversation;
            }));
        };

        // the "loadash-find" here means, no duplicate should be added to the converation list
        const newHandler = (conversation: FullConversationType) => {
            selectedItem((current) => {
                if (find(current, {id: conversation.id})) {
                    return current;
                }

                return [conversation, ...current];
            });
        };

        const deleteHandler = (conversation: FullConversationType) => {
            selectedItem((current) => {
                return [...current.filter((item) => item.id !== conversation.id)]
            })
        }

        pusherClient.bind('conversation:update', updateHandler);
        pusherClient.bind('conversation:new', newHandler);
        pusherClient.bind('conversation:delete', deleteHandler)

    }, [pusherKey, router])

    return (
        <>
            <GroupChatModal 
                users={users}
                isOpen={GroupModalOpen}
                onClose={() => IsGroupModalOpen(false)}
            />
            <aside className={clsx(
                `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
                isOpen ? "hidden" : "block w-full left-0"
            )}>
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800">
                            Messages
                        </div>
                        <div 
                            className="bg-gray-100 rounded-full p-2 text-grat-600 cursor-pointer hover:opacity-75 transition"
                            onClick={() => IsGroupModalOpen(true)}
                        >
                            <MdOutlineGroupAdd size={20}/>
                        </div>
                    </div>
                    {items.map((item) => (
                        <ConversationBox 
                            key={item.id}
                            data={item}
                            selected={conversationId === item.id}
                        />
                    ))}
                </div>
            </aside>
        </>
    )
}