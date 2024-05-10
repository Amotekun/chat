import { useConversation } from "@/hooks/use-conversation";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation"
import { useMemo } from "react";
import { HiChat, HiUsers } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

export const useNavigations = () => {
    const pathname = usePathname();
    const {conversationId} = useConversation();

    const navigations = useMemo(() => [
        {
            label: "Chat",
            href: "/conversations",
            icon: HiChat,
            isActive: pathname === "/conversation" || !!conversationId
        },
        {
            label: "Users",
            href: "/users",
            icon: HiUsers,
            isActive: pathname === "/users"
        },
        {
            label: "Logout",
            onClick: () => signOut(),
            href: "#",
            icon: HiArrowLeftOnRectangle
        }
    ], [pathname, conversationId])

    return navigations;
}