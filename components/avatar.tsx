import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user?: User;
}

export const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    return (
        <div className="">
            <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
                <Image 
                    fill
                    src={user?.image ||  "/images/placeholder.jpg"}
                    alt="Avatar image"
                />
            </div>
        </div>
    )
}