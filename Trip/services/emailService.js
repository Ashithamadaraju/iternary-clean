import nodemailer from "nodemailer";

export const sendEmail = async (to, pdfBuffer, qrBuffer) => {
  try {
    // 1. Create transporter (using Gmail here; for production, consider SMTP or a mail service)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // ⚠️ Must be App Password if Gmail
      },
    });

    // 2. Mail options
    const mailOptions = {
      from: `"Travel Planner" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your Travel Itinerary ",
      text: "Attached is your travel itinerary (PDF) along with a QR code for directions.",
      attachments: [
        {
          filename: "itinerary.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
        ...(qrBuffer
          ? [
              {
                filename: "qrcode.png",
                content: qrBuffer,
                contentType: "image/png",
              },
            ]
          : []), // only add QR if it exists
      ],
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to: ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
};
