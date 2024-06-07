"use client";

import { User } from "@prisma/client";
import { Avatar } from "../avatar";
import { DesktopItem } from "./desktop-items";
import { useNavigations } from "./use-navigation"
import { SettingsModal } from "./settings-modal";
import { useState } from "react";

interface DesktopSidebarProps {
    currentUser: User;
};

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {
    const navigations = useNavigations();

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <SettingsModal 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                currentUser={currentUser}
            />
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
                <nav className="mt-4 flex flex-col justify-between">
                    <ul role= "list" className="flex flex-col items-center space-y-1">
                        {navigations.map((nav) => (
                            <DesktopItem 
                                key={nav.label}
                                href={nav.href}
                                icon={nav.icon}
                                isActive={nav.isActive}
                                onClick={nav.onClick}
                                label={nav.label}
                            />
                        ))}
                    </ul>
                </nav>
                <nav className="mt-4 flex flex-col justify-between items-center">
                    <div
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer hover:opacity-75 transition"
                    >
                        <Avatar 
                            user={currentUser}
                        />
                    </div>
                </nav>
            </div>
        </>
    )
}