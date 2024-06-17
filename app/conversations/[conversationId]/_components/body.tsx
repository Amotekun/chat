"use client";

import { FullMessageType } from "@/app/types"
import { useEffect, useRef, useState } from "react";
import { MessageCard } from "./message-card";
import axios from "axios";
import { useConversation } from "@/hooks/use-conversation";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface BodyProps {
    initialMessages: FullMessageType[];
}

export const Body: React.FC<BodyProps> = ({
    initialMessages,
}) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const {conversationId} = useConversation();
    const [messages, setMessages] = useState(initialMessages);

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    useEffect(() => {
        pusherClient.subscribe(conversationId);

        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`);

            setMessages((current) => {
                if (find(current, {id: message.id})) {
                    return current;
                }

                return [...current, message]
            });

            bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
        };

        const updatedMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) => current.map((currentMessage) => {
                if (currentMessage.id === newMessage.id) {
                    return newMessage;
                }

                return currentMessage;
            }));
        };
        
        pusherClient.bind('message:new', messageHandler);
        pusherClient.bind('message:update', updatedMessageHandler)

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('message:new', messageHandler);
            pusherClient.unbind('message:update', updatedMessageHandler )
        }
    }, [conversationId, messages]);

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageCard 
                    key={message.id}
                    data={message}
                    isLast={i === messages.length - 1}
                />
            ))}
            <div className="pt-24" ref={bottomRef} />
        </div>
    )
}