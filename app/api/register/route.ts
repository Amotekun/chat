import db from "@/app/libs/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
    const body = await req.json();

    const {
        name,
        email,
        password
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user)
    } catch (error: any) {
        console.log("REGISTER_POST_ERROR", error)
        return NextResponse.json("Internal server error", {status: 500})
    }
};