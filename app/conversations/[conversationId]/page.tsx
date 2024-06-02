import { getConversationById } from "@/app/actions/get-conversation-by-id";
import { Header } from "./_components/header";
import { EmptyState } from "@/components/empty-state";
import { Form } from "./_components/form";
import { Body } from "./_components/body";
import { getMessages } from "@/app/actions/get-messages";

interface ConversationIdProps {
    params: {conversationId: string}
}

export default async function ConversationId({
    params
}: ConversationIdProps) {
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )
    }
    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
                <Body initialMessages={messages} />
                <Form />
            </div>
        </div>
    )
}