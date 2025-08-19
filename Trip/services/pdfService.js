import PDFDocument from "pdfkit";

export const generatePDF = (itinerary, qrBuffer) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];

      // Collect PDF stream data
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const result = Buffer.concat(chunks);
        resolve(result);
      });

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

        doc.moveDown();
        doc.image(qrBuffer, {
          fit: [200, 200],
          align: "center",
          valign: "center",
        });
      }

      // Finalize PDF
      doc.end();

    } catch (err) {
      reject(err);
    }
  });
};
