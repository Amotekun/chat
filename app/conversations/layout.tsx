import { Sidebar } from "@/components/sidebar/sidebar";
import { getConversations } from "@/app/actions/get-conversations";
import { ConversationList } from "./components/conversation-list";

export default async function ConversationLayout({
    children
}: {
    children: React.ReactNode,
}) {
    const conversations = await getConversations()
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList 
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}