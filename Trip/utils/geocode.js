import NodeGeocoder from "node-geocoder";

const options = {
  provider: "google",
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
};

const geocoder = NodeGeocoder(options);

export const getCoordinates = async (address) => {
  const res = await geocoder.geocode(address);
  return res[0];
};
