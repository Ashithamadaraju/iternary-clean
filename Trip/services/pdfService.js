import PDFDocument from "pdfkit";
import getStream from "get-stream";

export const generatePDF = async (itinerary, qrBuffer) => {
  const doc = new PDFDocument();

  // Add itinerary text
  doc.fontSize(14).text(itinerary, {
    align: "left",
    lineGap: 6,
  });

  // Add QR code if available
  if (qrBuffer) {
    doc.addPage();
    doc.fontSize(16).text("Scan this QR code for directions:", {
      align: "center",
      underline: true,
    });

    // Center the QR code image
    doc.moveDown();
    doc.image(qrBuffer, {
      fit: [200, 200],
      align: "center",
      valign: "center",
    });
  }

  // Finalize PDF
  doc.end();

  // Convert the PDF stream to a Buffer
  const buffer = Buffer.from(await getStream(doc));
  return buffer;
};
