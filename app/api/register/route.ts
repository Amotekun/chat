import db from "@/app/libs/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
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

    console.log(user);

    return NextResponse.json(user)
};