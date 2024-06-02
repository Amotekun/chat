"use client";

import { FullMessageType } from "@/app/types"
import { useEffect, useState } from "react";
import { MessageCard } from "./message-card";
import axios from "axios";
import { useConversation } from "@/hooks/use-conversation";

interface BodyProps {
    initialMessages: FullMessageType[];
}

export const Body: React.FC<BodyProps> = ({
    initialMessages,
}) => {
    const {conversationId} = useConversation();
    const [messages, setMessages] = useState(initialMessages);

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageCard 
                    key={message.id}
                    data={message}
                    isLast={i === messages.length - 1}
                />
            ))}
        </div>
    )
}