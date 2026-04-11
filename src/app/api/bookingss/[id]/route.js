import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";

export async function PATCH(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const { status } = await req.json();

        const booking = await Booking.findOneAndUpdate(
            { _id: id, userEmail: session.user.email },
            { status },
            { new: true }
        );

        if (!booking) {
            return NextResponse.json(
                { message: "Booking not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Booking updated.", booking },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Server error.", error: err.message },
            { status: 500 }
        );
    }
}