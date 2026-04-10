import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
    try {
        await dbConnect();
        const { nid, name, email, contact, password } = await req.json();

        const existing = await User.findOne({ email });
        if (existing) {
            return NextResponse.json(
                { message: "Email already registered." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ nid, name, email, contact, password: hashedPassword });

        return NextResponse.json(
            { message: "User registered successfully." },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Server error.", error: err.message },
            { status: 500 }
        );
    }
}