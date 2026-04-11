import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendInvoiceEmail({ to, booking }) {
    const {
        serviceName,
        duration,
        durationType,
        location,
        totalCost,
        createdAt,
    } = booking;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f9f5eb; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: #16A34A; padding: 32px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 800; }
        .header p { color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px; }
        .body { padding: 32px; }
        .greeting { font-size: 16px; color: #1C1917; margin-bottom: 24px; }
        .invoice-box { background: #FFFBEB; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
        .invoice-box h2 { font-size: 14px; color: #78716C; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E7E5E0; }
        .row:last-child { border-bottom: none; }
        .row .label { color: #78716C; font-size: 14px; }
        .row .value { color: #1C1917; font-size: 14px; font-weight: 600; }
        .total-box { background: #16A34A; border-radius: 12px; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .total-box .label { color: rgba(255,255,255,0.85); font-size: 14px; }
        .total-box .amount { color: white; font-size: 28px; font-weight: 800; }
        .status-badge { display: inline-block; background: #FEF9C3; color: #A16207; padding: 6px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; }
        .footer { background: #F8FAFC; padding: 24px 32px; text-align: center; }
        .footer p { color: #78716C; font-size: 12px; margin: 4px 0; }
        .footer .brand { color: #16A34A; font-weight: 800; font-size: 16px; }
        .btn { display: inline-block; background: #16A34A; color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; margin-top: 8px; }
    </style>
    </head>
    <body>
        <div class="wrapper">
        <div class="header">
            <h1>Care<span style="color:#FBBF24">.xyz</span></h1>
            <p>Booking Invoice & Confirmation</p>
        </div>
        <div class="body">
            <p class="greeting">
            Hello! 👋 Thank you for booking with <strong>Care.xyz</strong>. 
            Your booking has been received and is currently being processed.
            </p>

        <div class="invoice-box">
            <h2>Booking Details</h2>
            <div class="row">
                <span class="label">Service</span>
                <span class="value">${serviceName}</span>
            </div>
            <div class="row">
                <span class="label">Duration</span>
                <span class="value">${duration} ${durationType}</span>
            </div>
            <div class="row">
                <span class="label">Division</span>
                <span class="value">${location.division}</span>
            </div>
            <div class="row">
                <span class="label">District</span>
                <span class="value">${location.district}</span>
            </div>
            <div class="row">
                <span class="label">City</span>
                <span class="value">${location.city}</span>
            </div>
            <div class="row">
                <span class="label">Area</span>
                <span class="value">${location.area}</span>
            </div>
            <div class="row">
                <span class="label">Address</span>
                <span class="value">${location.address}</span>
            </div>
            <div class="row">
                <span class="label">Booking Date</span>
                <span class="value">${new Date(createdAt).toLocaleDateString("en-BD", {
        day: "numeric", month: "long", year: "numeric"
    })}</span>
            </div>
            <div class="row">
                <span class="label">Status</span>
                <span class="value"><span class="status-badge">⏳ Pending</span></span>
            </div>
            </div>

            <div class="total-box">
            <span class="label">Total Amount</span>
            <span class="amount">৳${totalCost}</span>
            </div>

            <p style="color:#78716C; font-size:13px; line-height:1.6;">
            Our team will review your booking and confirm it shortly. 
            You can track your booking status anytime from your 
            <strong>My Bookings</strong> page.
            </p>

            <div style="text-align:center; margin-top:24px;">
            <a href="${process.env.NEXTAUTH_URL}/my-bookings" class="btn">
            View My Bookings →
            </a>
            </div>
        </div>
        <div class="footer">
            <p class="brand">Care.xyz</p>
            <p>Trusted care services across Bangladesh</p>
            <p style="margin-top:8px;">📧 support@care.xyz &nbsp;|&nbsp; 📞 +880 1700 000000</p>
            <p style="margin-top:8px; font-size:11px;">
            This is an automated email. Please do not reply to this message.
            </p>
        </div>
    </div>
    </body>
    </html>
`;

    await transporter.sendMail({
        from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
        to,
        subject: `✅ Booking Confirmed — ${serviceName} | Care.xyz`,
        html,
    });
}