import QRCode from "qrcode";

// Generate a QR code and return it as a Buffer
export const generateQRCode = async (text) => {
  try {
    const buffer = await QRCode.toBuffer(text, {
      type: "png",    // output format
      errorCorrectionLevel: "H", // best error correction
      width: 300,     // size in pixels
    });
    return buffer;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};
