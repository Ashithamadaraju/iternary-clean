import nodemailer from "nodemailer";

export const sendEmail = async (to, pdfBuffer, qrBuffer) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password if Gmail
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Your Travel Itinerary",
      text: "Please find attached your travel itinerary and QR code.",
      attachments: [
        {
          filename: "itinerary.pdf",
          content: pdfBuffer, // PDF buffer
          contentType: "application/pdf",
        },
        {
          filename: "qrcode.png",
          content: qrBuffer, // QR image buffer
          contentType: "image/png",
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
