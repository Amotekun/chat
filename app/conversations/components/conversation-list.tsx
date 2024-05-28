"use client";

import { FullConversationType } from "@/app/types";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { ConversationBox } from "./conversation-box";
import { useConversation } from "@/hooks/use-conversation";
import clsx from "clsx";

interface ConversationListProps {
    initialItems: FullConversationType[]
}

export const ConversationList: React.FC<ConversationListProps> = ({
    initialItems
}) => {
    const [items, selectedItem] = useState(initialItems);
    const {conversationId, isOpen} = useConversation();

    return (
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
                        onClick={() => {}}
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
    )
}