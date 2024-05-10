import { getCurrentuser } from "@/app/actions/get-currentuser";
import { DesktopSidebar } from "./desktop-sidebar";
import { MobileFooter } from "./mobile-footer";

interface SidebarProps {
    children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = async ({
    children
}) => {
    const currentUser = await getCurrentuser();
    return (
        <div className="h-full">
            <DesktopSidebar currentUser = {currentUser!} />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}