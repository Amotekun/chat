import { FullConversationType } from "@/app/types";
import { Avatar } from "@/components/avatar";
import { useOtherUsers } from "@/hooks/use-other-users";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ConversationBoxProps {
    data: FullConversationType;
    selected?: boolean;
}

export const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected,
}) => {
    const otherUsers = useOtherUsers(data)
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data, router]);
    
    return (
        <div 
            onClick={handleClick}
            className={clsx(
                `w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer`
        )}>
            {/* GROUP MESSAGE FEATURE */}
            <Avatar user={otherUsers}  />
            <div>
                <div >
                    <span />
                    <div className="">
                        <p className="text-md font-medium text-gray-900">
                            {data.name || otherUsers.name}
                        </p>
                        {/* LAST MESSAGE TIME FEATURE HERE */}
                    </div>
                    <p>
                        {/* LAST MESSAGE TEXT FEATURE */}
                    </p>
                </div>
            </div>
        </div>
    )
}