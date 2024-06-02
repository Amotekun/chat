import { FullMessageType } from "@/app/types";
import { Avatar } from "@/components/avatar"
import { format } from "date-fns";
import { ImageModal } from "./image-modal";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { useSession } from "next-auth/react";

interface MessageCardProps {
    data: FullMessageType;
    isLast?: boolean;

}
export const MessageCard: React.FC<MessageCardProps> = ({
    data,
    isLast
}) => {
    const session = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const isSelf = session.data?.user?.email === data?.sender?.email;
    const seenMessages = (data.seenBy || [])
        .filter((user) => user.email != data?.sender?.email)
        .map((user) => user.name)
        .join(", ");
    
    return (
        <div className={clsx(
            "flex gap-3 p-4",
            isSelf && "justify-end"
        )}>
            <div className={clsx(isSelf && "order-2")}>
                <Avatar user={data.sender}/>
            </div>
            <div className={clsx(
                "flex flex-col gap-2",
                isSelf && "items-end"
            )}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div className={
                    clsx(
                        "text-sm w-fit overflow-hidden,",
                        isSelf ? "bg-sky-500 text-white" : "bg-gray-100", 
                        data.image ? "rounded-xl p-0" : "rounded-full py-2 px-3"
                    )
                }>
                    <ImageModal 
                        src={data.image}
                        isOpen={imageModalOpen}
                        onClose={() => setImageModalOpen(false)}
                    />
                    {data.image ? (
                        <Image 
                            src={data.image}
                            alt="message image"
                            width="288"
                            height="288"
                            onClick={() => setImageModalOpen(true)}
                            className="cursor-pointer object-cover hover:scale-110 transiton translate"

                        />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isLast && isSelf && seenMessages.length > 0 && (
                    <div className="text-xs font-light text-gray-500">
                        {`Seen by ${seenMessages}`}

                    </div>
                )}
            </div>
        </div>
    )
}