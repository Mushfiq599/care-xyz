import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        return NextResponse.json({ users });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}