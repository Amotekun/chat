import { getCurrentuser } from "@/app/actions/get-currentuser"
import db from "@/app/libs/db";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        const currentUser = await getCurrentuser();
        const body = await req.json();

        const {
            name,
            image,
        } = body;

        if (!currentUser?.id) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        const updatedUser = await db.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name: name,
                image: image,
            },
        });

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log('SETTINGS_POST', error)
        return new NextResponse('Error', {status: 500})
    }

}