import axios from "axios";

export const getWeather = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const res = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  return res.data;
};
