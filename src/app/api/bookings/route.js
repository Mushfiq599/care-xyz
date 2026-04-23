import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import { sendInvoiceEmail } from "@/lib/sendInvoiceEmail";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        const booking = await Booking.create({
            userId: session.user.id,
            userEmail: session.user.email,
            serviceId: body.serviceId,
            serviceName: body.serviceName,
            duration: body.duration,
            durationType: body.durationType,
            location: body.location,
            totalCost: body.totalCost,
            status: "pending",
            paymentIntentId: body.paymentIntentId || null,
            paymentStatus: "paid",
        });

        try {
            await sendInvoiceEmail({ to: session.user.email, booking });
        } catch (emailErr) {
            console.error("Email failed:", emailErr.message);
        }

        return NextResponse.json(
            { message: "Booking created successfully.", booking },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Server error.", error: err.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        // Only current user's bookings
        const bookings = await Booking.find({
            userEmail: session.user.email,
        }).sort({ createdAt: -1 });

        return NextResponse.json({ bookings }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { message: "Server error.", error: err.message },
            { status: 500 }
        );
    }
}