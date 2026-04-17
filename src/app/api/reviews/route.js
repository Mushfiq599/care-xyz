import { NextResponse } from "next/server";

export async function GET() {
    const reviews = [
        {
            id: "1",
            userName: "Nusrat Jahan",
            role: "Mother of 2",
            review: "Care.xyz helped me find a wonderful babysitter within hours. My kids love her!",
            ratings: 5,
            user_photoURL: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: "2",
            userName: "Karim Uddin",
            role: "Son of elderly parent",
            review: "My father gets the best care every day. The caretaker is professional and kind.",
            ratings: 5,
            user_photoURL: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: "3",
            userName: "Sumaiya Akter",
            role: "Working professional",
            review: "I can focus on work knowing my mother is in safe hands. Highly recommended!",
            ratings: 5,
            user_photoURL: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
            id: "4",
            userName: "Rahim Hossain",
            role: "Father of 3",
            review: "Excellent service! The babysitter was punctual, caring, and very professional.",
            ratings: 5,
            user_photoURL: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        {
            id: "5",
            userName: "Fatema Begum",
            role: "Daughter of elderly parent",
            review: "My mother is very happy with her caretaker. She feels safe and well cared for.",
            ratings: 5,
            user_photoURL: "https://randomuser.me/api/portraits/women/22.jpg"
        }
    ];

    return NextResponse.json(reviews);
}