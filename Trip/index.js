// Allow self-signed certificates (local testing only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import itineraryRoutes from "./routes/itineraryRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import open from "open"; // <-- import open

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
const HOST = "localhost";
const url = `http://${HOST}:${PORT}`;

app.listen(PORT, async () => {
  console.log(`🚀 Server running at: ${url}`);
  // Automatically open the URL in default browser
  await open(url);
});
