import NodeGeocoder from 'node-geocoder';

const provider = process.env.GEOCODER_PROVIDER || 'openstreetmap';
const geocoder = NodeGeocoder({ provider, httpAdapter: 'https' });

export async function geocode(q) {
  if (!q) throw new Error('q is required');
  const res = await geocoder.geocode(q);
  return res?.[0] ?? null;
}