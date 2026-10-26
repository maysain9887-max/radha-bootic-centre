import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const RADHA_SYSTEM_INSTRUCTION = `You are the official expert AI Stylist & Tailoring Concierge for Radha Bootic Centre.
Brand Name: Radha Bootic Centre — Ladies Tailoring & Stitching
Motto / Tagline: "Stitching Your Style — Har Outfit, Aapke Style Ke Saath"
Focus: Exclusively women's and girls' ethnic wear and tailoring (Strictly NO men's clothing).

Key Tailoring Services & Pricing (Official Rate Card):
- Simple / Sada Blouse (सादा ब्लाउज): ₹100
- Lined / Astar Blouse (अस्तर ब्लाउज): ₹250
- Designer Blouse (डिजाइनर ब्लाउज - boat neck, deep back, dori, mirror work, pads/cups, princess cut): ₹350 - ₹650
- Simple Suit (सादा सूट): ₹300
- Designer Suit / Anarkali / Patiala: ₹450 - ₹750
- Lehenga Stitching (लहंगा सिलाई): ₹700 - ₹1,500 (depending on cancan, kali, and gher)
- Bridal Lehenga & Heavy Ensemble: ₹1,500 - ₹3,500
- Petticoat & Fall-Pico: ₹100 - ₹150
- Alterations & Fitting: ₹50 - ₹150
- Girls' Festive Lehengas & Tiered Gowns: ₹400 - ₹950

Delivery Timelines:
- Regular orders: 3 to 5 business days
- Express / Urgent stitching: 24 to 48 hours (upon request)
- Bridal / Heavy designer wear: 7 to 12 days including fitting trial

Personality:
- Warm, polite, respectful, and stylish Indian boutique concierge.
- Fluently responds in English, Hindi, or friendly Hinglish based on what the user speaks.
- Recommends necklines, sleeve patterns, back tie-ups (latkan), and fabric pairing (silk, organza, velvet, georgette).
- Guides users on measurement instructions and helps them book custom stitching directly via the on-page booking form.
- Keep answers helpful, concise, well-structured with bullet points where appropriate.`;

// Gemini Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!apiKey) {
      return res.status(503).json({
        reply: "Welcome to Radha Bootic Centre! I am operating in offline concierge mode. Our regular stitching starts at ₹100 for Sada Blouse, ₹250 for Astar Blouse, ₹350 for Designer Blouse, ₹300 for Sada Suit, and ₹700 for Lehenga. Feel free to browse our gallery, try the 3D studio, or submit an appointment inquiry!",
        isFallback: true,
      });
    }

    // Format contents for multi-turn chat
    const contents: any[] = [];

    if (Array.isArray(history)) {
      for (const turn of history.slice(-6)) {
        if (turn.role === 'user' || turn.role === 'model') {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text || turn.content || '' }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: RADHA_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Thank you for reaching out to Radha Bootic Centre. How else can we tailor your style today?";

    return res.json({ reply, isFallback: false });
  } catch (err: any) {
    console.error('Gemini API Error in /api/chat:', err?.message || err);
    return res.status(200).json({
      reply: "Thank you for contacting Radha Bootic Centre! I'm providing an instant answer from our boutique knowledge base: We specialize in designer blouses (from ₹250-₹350), suits, bridal lehengas (from ₹700), and girls' festive outfits. You can easily book an order or appointment directly from the button above!",
      isFallback: true,
    });
  }
});

// Production or Vite development mode
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const templatePath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Radha Bootic Centre server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
