import { Sidebar } from "@/components/sidebar/sidebar";
import { getConversations } from "@/app/actions/get-conversations";
import { ConversationList } from "./components/conversation-list";
import { getUsers } from "@/app/actions/get-users";

export default async function ConversationLayout({
    children
}: {
    children: React.ReactNode,
}) {
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList 
                    initialItems={conversations}
                    title="Messages"
                    users={users}
                />
                {children}
            </div>
        </Sidebar>
    )
}