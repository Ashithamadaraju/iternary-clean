import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePlan = async (startCity, destinationCity, days, theme) => {
  try {
    const prompt = `
    Plan a ${days}-day ${theme} trip from ${startCity} to ${destinationCity}.
    Include day-wise itinerary, budget breakdown, local food, and cultural events.
    Format it ONLY as plain readable text (no JSON, no code blocks).
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let itinerary = response.choices[0]?.message?.content || "";

    // Ensure we always return a clean string
    itinerary = String(itinerary)
      .replace(/^```(json|javascript|text)?/gi, "") // remove ```json
      .replace(/```$/g, "") // remove trailing ```
      .trim();

    return itinerary;
  } catch (err) {
    console.error("❌ Error in generatePlan:", err);
    return "Could not generate itinerary. Please try again.";
  }
};
