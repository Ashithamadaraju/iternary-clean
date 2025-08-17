import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generatePlan = async (startCity, destinationCity, days, theme) => {
  const prompt = `
    Plan a ${days}-day ${theme} trip from ${startCity} to ${destinationCity}.
    Include day-wise itinerary, budget breakdown, local food, and cultural events.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content;
};
