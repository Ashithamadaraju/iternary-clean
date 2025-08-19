import { generatePlan } from "../services/openaiService.js";
import { generatePDF } from "../services/pdfService.js";
import { sendEmail } from "../services/emailService.js";
import { generateQRCode } from "../services/qrService.js";

export const generateItinerary = async (req, res) => {
  try {
    const { startCity, destinationCity, days, theme, email } = req.body;

    // 1. Generate itinerary text with OpenAI
    let itinerary = await generatePlan(
      startCity,
      destinationCity,
      days,
      theme
    );

    console.log("✅ Raw itinerary from OpenAI:", itinerary);

    // Make sure it's a string
    if (typeof itinerary !== "string") {
      itinerary = JSON.stringify(itinerary, null, 2);
    }

    if (!itinerary || itinerary.trim().length === 0) {
      throw new Error("Itinerary is empty — OpenAI did not return valid text");
    }

    // 2. Generate QR code buffer (Google Maps link)
    const qrBuffer = await generateQRCode(
      `https://maps.google.com/?q=${destinationCity}`
    );
    console.log("✅ QR buffer size:", qrBuffer.length);

    // 3. Generate PDF buffer (with itinerary + QR code)
    const pdfBuffer = await generatePDF(itinerary, qrBuffer);
    console.log("✅ PDF buffer size:", pdfBuffer.length);

    // 4. If email is provided, send itinerary
    if (email) {
      await sendEmail(email, pdfBuffer, qrBuffer);
      console.log("✅ Email sent to:", email);
    }

    // 5. Send the PDF back to frontend for download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=itinerary.pdf"
    );
    res.send(pdfBuffer);

  } catch (err) {
    console.error("❌ Error generating itinerary:", err);
    res
      .status(500)
      .json({ success: false, error: err.message || "Internal Server Error" });
  }
};
