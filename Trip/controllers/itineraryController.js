import { generatePlan } from "../services/openaiService.js";
import { generatePDF } from "../services/pdfService.js";
import { sendEmail } from "../services/emailService.js";
import { generateQRCode } from "../services/qrService.js";

export const generateItinerary = async (req, res) => {
  try {
    const { startCity, destinationCity, days, theme, email } = req.body;

    const itinerary = await generatePlan(startCity, destinationCity, days, theme);

    const qr = await generateQRCode(`https://maps.google.com/?q=${destinationCity}`);
    const pdfBuffer = await generatePDF(itinerary, qr);

    if (email) {
      await sendEmail(email, pdfBuffer);
    }

    res.json({ success: true, itinerary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
