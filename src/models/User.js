import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    password: { type: String }, // null for Google login users
    image: { type: String },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);