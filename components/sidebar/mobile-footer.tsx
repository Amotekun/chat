"use client";

import { MobileItem } from "./mobile-item";
import { useNavigations } from "./use-navigation";

export const MobileFooter = () => {
    const navigations = useNavigations();

    return (
        <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden ">
            {navigations.map((nav) => (
                <MobileItem 
                    key={nav.href}
                    href={nav.href}
                    icon={nav.icon}
                    isActive={nav.isActive}
                    onClick={nav.onClick}
                />
            ))}  
        </div>
    )
};