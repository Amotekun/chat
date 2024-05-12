import { Sidebar } from "@/components/sidebar/sidebar";
import { getUsers } from "@/app/actions/get-users";
import { UserList } from "./components/user-list";

export default async function UserLayout({
    children
}: {
    children: React.ReactNode,
}) {
    const users = await getUsers()
    return (
        <Sidebar>
            <div className="h-full">
                <UserList userList={users} />
                {children}
            </div>
        </Sidebar>
    )
}