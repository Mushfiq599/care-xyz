import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    duration: { type: Number, required: true },
    durationType: { type: String, enum: ["hours", "days"], required: true },
    location: {
        division: { type: String, required: true },
        district: { type: String, required: true },
        city: { type: String, required: true },
        area: { type: String, required: true },
        address: { type: String, required: true },
    },
    totalCost: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending",
    },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);