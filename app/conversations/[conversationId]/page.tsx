import { getConversationById } from "@/app/actions/get-conversation-by-id";
import { Header } from "./_components/header";
import { EmptyState } from "@/components/empty-state";
import { Form } from "./_components/form";

interface ConversationIdProps {
    params: {conversationId: string}
}

export default async function ConversationId({
    params
}: ConversationIdProps) {
    const conversation = await getConversationById(params.conversationId);

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
                <div className="flex-grow"></div>
                <Form />
            </div>
        </div>
    )
}