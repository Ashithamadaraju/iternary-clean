import gtts from 'google-tts-api';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export async function speak(text) {
  const url = gtts.getAudioUrl(text, { lang: 'en', slow: false });
  const outDir = path.resolve('tmp');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `tts-${Date.now()}.mp3`);
  const resp = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(outPath, resp.data);
  return outPath;
}