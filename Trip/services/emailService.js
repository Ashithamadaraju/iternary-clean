import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (receiverEmail, pdfBuffer) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: receiverEmail,
    subject: "Your Travel Itinerary",
    text: "Here's your travel itinerary!",
    attachments: [{ filename: "itinerary.pdf", content: pdfBuffer }]
  });
};
