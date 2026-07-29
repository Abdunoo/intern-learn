// chatbot.js
// Contoh chatbot terminal sederhana pakai Gemini API
// Install dulu: npm install @google/genai dotenv

import { GoogleGenAI } from "@google/genai";
import readline from "readline";
import "dotenv/config";

// Ambil API key dari file .env (jangan hardcode langsung di kode!)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Buat sesi chat supaya history percakapan otomatis diingat
const chatSession = ai.chats.create({
  model: "gemini-2.5-flash",
  config: {
    systemInstruction:
      "Kamu adalah asisten AI yang ramah dan menjawab dalam Bahasa Indonesia.",
  },
});

// Setup input dari terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("=== Chatbot Gemini ===");
console.log("Ketik 'exit' untuk keluar.\n");

function tanyaUser() {
  rl.question("Kamu: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Sampai jumpa!");
      rl.close();
      return;
    }

    try {
      // Kirim pesan ke Gemini, history otomatis dikelola oleh chatSession
      const response = await chatSession.sendMessage({ message: input });
      console.log("Bot: " + response.text + "\n");
    } catch (error) {
      console.error("Terjadi error:", error.message);
    }

    tanyaUser(); // ulangi loop supaya bisa chat terus
  });
}

tanyaUser();
