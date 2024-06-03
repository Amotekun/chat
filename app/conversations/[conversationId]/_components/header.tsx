"use client";

import { Avatar } from "@/components/avatar";
import { useOtherUsers } from "@/hooks/use-other-users";
import { Conversation, User } from "@prisma/client";
import Link from "next/link"
import { HiChevronLeft } from "react-icons/hi"
import { HiEllipsisHorizontal } from "react-icons/hi2"
import { ProfileDrawer } from "./profile_drawers";
import { useState } from "react";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

export const Header: React.FC<HeaderProps> = ({conversation}) => {
    const otherUser = useOtherUsers(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <ProfileDrawer 
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div 
                className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm"
            >
                <div className="flex gap-3 items-center">
                    <Link 
                        href="/conversations"
                        className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer">
                        <HiChevronLeft size={32}/>
                    </Link>
                    <Avatar user={otherUser} />
                    <div className="flex flex-col">
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div>
                            {/* STATUS TEXT */}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal 
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="text-sky-500 cursor-pointer hove:text-sky-600 transition"
                />
            </div>
        </>
    )
}