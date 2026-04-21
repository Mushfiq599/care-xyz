import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const totalBookings = await Booking.countDocuments();
        const totalUsers = await User.countDocuments();
        const pendingBookings = await Booking.countDocuments({ status: "pending" });
        const confirmedBookings = await Booking.countDocuments({ status: "confirmed" });
        const completedBookings = await Booking.countDocuments({ status: "completed" });
        const cancelledBookings = await Booking.countDocuments({ status: "cancelled" });

        const revenueData = await Booking.aggregate([
            { $match: { status: { $in: ["confirmed", "completed"] } } },
            { $group: { _id: null, total: { $sum: "$totalCost" } } },
        ]);

        const totalRevenue = revenueData[0]?.total || 0;

        return NextResponse.json({
            totalBookings,
            totalUsers,
            totalRevenue,
            pendingBookings,
            confirmedBookings,
            completedBookings,
            cancelledBookings,
        });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}