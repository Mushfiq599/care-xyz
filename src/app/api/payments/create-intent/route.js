import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { totalCost, serviceName } = await req.json();

        // Stripe requires amount in smallest currency unit
        // Converting BDT to cents (1 BDT = 100 paisa)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCost * 100,
            currency: "bdt",
            metadata: {
                userEmail: session.user.email,
                serviceName,
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}