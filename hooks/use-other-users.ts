import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useOtherUsers = (conversation: FullConversationType | {users: User[]}) => {

    const session = useSession();

    console.log("SESSION: ", session);

    const otherUsers = useMemo(() => {
        const currentUserEmail = session.data?.user?.email;

        const otherUsers = conversation.users.filter((user) => user.email !== currentUserEmail);

        return otherUsers[0];
    }, [session.data?.user?.email, conversation.users])

    return otherUsers;
};