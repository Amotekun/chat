import { FullConversationType } from "@/app/types";
import { Avatar } from "@/components/avatar";
import { AvatarGroup } from "@/components/avatar-group";
import { useOtherUsers } from "@/hooks/use-other-users";
import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

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

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1];
    }, [data.messages])

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image';
        }

        if (lastMessage?.body) {
            return lastMessage?.body
        }

        return "Start a conversation"
    }, [lastMessage])
    
    return (
        <div 
            onClick={handleClick}
            className={clsx(
                `w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
                selected ? 'bg-neutral-100' : 'hover:bg-white'
        )}>
            {data.isGroup ? (
                <AvatarGroup users={data.users}  />
            ) : (
                <Avatar user={otherUsers}  />
            )}
            <div>
                <div >
                    <span />
                    <div className="">
                        <p className="text-md font-medium text-gray-900">
                            {data.name || otherUsers.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p>
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}