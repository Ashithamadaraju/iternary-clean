import PDFDocument from "pdfkit";
import getStream from "get-stream";

export const generatePDF = async (itinerary, qrBuffer) => {
  const doc = new PDFDocument();
  doc.text(itinerary, { align: "left" });

  if (qrBuffer) {
    doc.addPage().image(qrBuffer, { fit: [200, 200], align: "center" });
  }

  doc.end();
  return getStream.buffer(doc);
};
