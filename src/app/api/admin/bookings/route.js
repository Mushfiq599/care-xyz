import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        // Fetch ALL bookings from ALL users — no email filter!
        const bookings = await Booking.find().sort({ createdAt: -1 });

        return NextResponse.json({ bookings });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}