import { Sidebar } from "@/components/sidebar/sidebar";

export default function ConversationLayout({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    )
}