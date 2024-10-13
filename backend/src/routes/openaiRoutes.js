const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const dotenv = require("dotenv");

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/generate-route", async (req, res) => {
  const { prompt } = req.body; 
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4", 
      messages: [
        { role: "user", content: prompt } 
      ],
    });

    const generatedRoute = chatCompletion.choices.map((choice) => choice.message.content.trim());
    console.log(generatedRoute);
    res.status(200).json({ route: generatedRoute });
  } catch (error) {
    console.error("Error generating routes:", error);
    res.status(500).json({ error: "Failed to generate route." });
  }
});

router.post("/risk-calculation", async (req, res) => {
  const { prompt } = req.body; 
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4", 
      messages: [
        { role: "user", content: prompt } 
      ],
    });

    const riskAssessment = chatCompletion.choices.map((choice) => choice.message.content.trim());
    console.log(riskAssessment);
    res.status(200).json({ risk: riskAssessment });
  } catch (error) {
    console.error("Error generating routes:", error);
    res.status(500).json({ error: "Failed to generate route." });
  }
});

module.exports = router;