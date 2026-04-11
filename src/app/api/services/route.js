import { NextResponse } from "next/server";

const services = [
    {
        id: "baby-care",
        title: "Baby Care",
        tagline: "Safe, loving, professional care for your little ones",
        description: "Our certified babysitters provide a safe, nurturing environment for your children. Whether you need a few hours of help or full-day care, our trained professionals ensure your baby is happy, engaged, and well looked after.",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=80",
        icon: "👶",
        charge: 500,
        features: [
            "Certified & background-checked babysitters",
            "Age-appropriate activities & play",
            "Feeding, bathing & nap routines",
            "Real-time updates to parents",
            "Emergency first aid trained",
            "Available 24/7 on demand"
        ],
        faqs: [
            { q: "What age groups do you cover?", a: "We cover newborns to 12 years old." },
            { q: "Can I choose my babysitter?", a: "Yes, you can view profiles and select your preferred caretaker." },
            { q: "What if I need to cancel?", a: "You can cancel up to 2 hours before the booking starts." }
        ]
    },
    {
        id: "elderly-care",
        title: "Elderly Care",
        tagline: "Compassionate care for your elderly loved ones at home",
        description: "Our trained elderly care attendants provide companionship, medical assistance, and daily support for your aging parents or relatives — all from the comfort of their own home.",
        image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200&q=80",
        icon: "🧓",
        charge: 600,
        features: [
            "Trained elderly care specialists",
            "Medication reminders & health monitoring",
            "Mobility assistance & fall prevention",
            "Companionship & emotional support",
            "Meal preparation & feeding",
            "Regular family progress updates"
        ],
        faqs: [
            { q: "Do caretakers have medical training?", a: "Yes, all elderly care attendants have basic medical training." },
            { q: "Can they stay overnight?", a: "Yes, we offer overnight care packages." },
            { q: "Is this available outside Dhaka?", a: "Yes, we cover all 8 divisions of Bangladesh." }
        ]
    },
    {
        id: "sick-care",
        title: "Sick People Care",
        tagline: "Expert home care for sick and recovering family members",
        description: "Our professional attendants are trained to care for sick or recovering individuals at home. From post-surgery recovery to chronic illness management, we provide the right care at the right time.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80",
        icon: "🏥",
        charge: 700,
        features: [
            "Post-surgery & recovery care",
            "Chronic illness management",
            "Wound dressing & hygiene care",
            "Medication administration support",
            "Doctor visit assistance",
            "24/7 emergency response"
        ],
        faqs: [
            { q: "Can attendants administer medicine?", a: "They can assist with medication reminders and support." },
            { q: "What illnesses do you cover?", a: "We cover post-surgery, diabetes, stroke recovery and more." },
            { q: "Is equipment provided?", a: "Basic medical equipment is available on request." }
        ]
    }
];

export async function GET() {
    return NextResponse.json(services);
}