import QRCode from 'qrcode';

export const generateQRCode = async (url) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(url, { errorCorrectionLevel: 'H' }, (err, dataUrl) => {
      if (err) reject(err);
      else resolve(dataUrl);
    });
  });
};