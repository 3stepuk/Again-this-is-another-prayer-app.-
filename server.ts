import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side Gemini initialization
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// API Endpoint: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Endpoint: Patristic / Spiritual Reflection on an Office Reading or Psalm
app.post("/api/liturgy/reflection", async (req, res) => {
  try {
    const { officeName, date, season, readingTitle, text, psalmTitle, intention } = req.body;
    
    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not set yet
      return res.json({
        reflection: `This office (${officeName}) calls us to pause and offer our hearts to God. The words of ${readingTitle || psalmTitle || 'the divine office'} remind us of God's enduring mercy, invitation to holiness, and faithful presence throughout the hours of our day.`,
        patristicNote: "St. John Chrysostom teaches that praying the hours transforms our daily activities into a continual offering of praise, sanctifying time itself.",
        practicalAction: "Spend 2 minutes in silence after reading, offering your current tasks to the Lord.",
        isFallback: true
      });
    }

    const prompt = `You are a knowledgeable, reverent Catholic spiritual scholar and liturgical master. 
Provide a deep, inspirational, patristic-style spiritual reflection for the Liturgy of the Hours.

Office: ${officeName}
Season: ${season}
Date: ${date}
Reading / Psalm Title: ${readingTitle || psalmTitle}
Text excerpt: "${(text || '').slice(0, 1000)}"
${intention ? `Special Intention: ${intention}` : ''}

Respond with a JSON object containing:
1. "reflection": A warm, profound 2-paragraph spiritual reflection connecting this text to daily life, interior prayer, and sanctification of time.
2. "patristicNote": A short quote or insight from a Church Father (e.g. St. Augustine, St. Jerome, St. Gregory the Great, St. John Chrysostom, St. Thomas Aquinas) reflecting on this passage or hour.
3. "practicalAction": One concrete, simple spiritual practice or takeaway for the day.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const outputText = response.text || "";
    const parsed = JSON.parse(outputText);
    return res.json(parsed);
  } catch (error: any) {
    console.error("Error generating liturgical reflection:", error);
    return res.status(500).json({
      error: "Failed to generate reflection",
      details: error.message
    });
  }
});

// Setup Vite or Static File Serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Liturgy of the Hours app server running on http://0.0.0.0:${PORT}`);
  });
}

start();
