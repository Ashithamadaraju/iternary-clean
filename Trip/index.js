import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import itineraryRoutes from "./routes/itineraryRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import open from "open"; // still useful locally

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/itinerary", itineraryRoutes);

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0"; // ✅ important for deployment
const url = `http://localhost:${PORT}`;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Open browser only if running locally
  if (process.env.NODE_ENV !== "production") {
    await open(url);
  }
});
