import { generatePlan } from "../services/openaiService.js";
import { generatePDF } from "../services/pdfService.js";
import { sendEmail } from "../services/emailService.js";
import { generateQRCode } from "../services/qrService.js";

export const generateItinerary = async (req, res) => {
  try {
    const { startCity, destinationCity, days, theme, email } = req.body;

    // 1. Generate itinerary text using OpenAI
    const itinerary = await generatePlan(
      startCity,
      destinationCity,
      days,
      theme
    );

    // 2. Generate QR code buffer (Google Maps link)
    const qrBuffer = await generateQRCode(
      `https://maps.google.com/?q=${destinationCity}`
    );

    // 3. Generate PDF buffer (includes itinerary + QR code inside PDF)
    const pdfBuffer = await generatePDF(itinerary, qrBuffer);

    // 4. Send email if email is provided
    if (email) {
      await sendEmail(email, pdfBuffer, qrBuffer); // sends both PDF + QR image
    }

    // 5. Send PDF back to browser for download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=itinerary.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error generating itinerary:", err);
    res
      .status(500)
      .json({ success: false, error: err.message || "Internal Server Error" });
  }
};
