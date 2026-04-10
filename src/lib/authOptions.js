import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "./dbConnect";
import User from "@/models/User";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();
                const user = await User.findOne({ email: credentials.email });
                if (!user) throw new Error("No user found with this email");
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) throw new Error("Invalid password");
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                await dbConnect();
                const existing = await User.findOne({ email: user.email });
                if (!existing) {
                    await User.create({
                        nid: "N/A",
                        name: user.name,
                        email: user.email,
                        contact: "N/A",
                        image: user.image,
                    });
                }
            }
            return true;
        },
        async session({ session }) {
            await dbConnect();
            const dbUser = await User.findOne({ email: session.user.email });
            if (dbUser) {
                session.user.id = dbUser._id.toString();
            }
            return session;
        },
    },

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
};