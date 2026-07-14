import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with API Key from server-side environment
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log('Gemini AI SDK initialized successfully with user-agent: aistudio-build.');
  } else {
    console.warn('GEMINI_API_KEY is not defined in environment variables.');
  }
} catch (error) {
  console.error('Error initializing Gemini AI SDK:', error);
}

// --- API ENDPOINTS ---

// Secure Server-side API endpoint for Chatbot conversation
app.post('/api/chat', async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server. Please add it in Settings > Secrets.' });
  }

  const { messages, userMessage } = req.body;
  if (!userMessage) {
    return res.status(400).json({ error: 'User message is required.' });
  }

  try {
    // Robust conversation sequence building
    const rawHistory = (messages || []).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : m.role,
      content: m.content || '',
    }));

    // Append the current message
    rawHistory.push({ role: 'user', content: userMessage });

    // Filter to ensure the conversation sequence starts with a 'user' message
    let firstUserSeen = false;
    const sanitizedHistory = [];
    for (const m of rawHistory) {
      const role = m.role === 'model' ? 'model' : 'user';
      if (role === 'user') {
        firstUserSeen = true;
      }
      if (firstUserSeen) {
        sanitizedHistory.push(m);
      }
    }

    // Sanitize sequence so adjacent roles are merged, preventing 400 Alternating Role errors
    const contents: any[] = [];
    for (const msg of sanitizedHistory) {
      if (!msg.content || !msg.content.trim()) continue;

      const role = msg.role === 'model' ? 'model' : 'user';

      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        // Merge into current message
        contents[contents.length - 1].parts[0].text += '\n\n' + msg.content;
      } else {
        contents.push({
          role: role,
          parts: [{ text: msg.content }]
        });
      }
    }

    if (contents.length === 0) {
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction: `You are the ultimate DSA.viz Interactive AI Assistant. You specialize in Data Structures, Algorithms, Coding, and Aptitude.
Provide clear, accurate, deep technical answers with clean markdown-formatted explanations.
Keep explanations visual, structured, using ASCII diagrams if helpful, or concrete step-by-step code analysis.
If the student asks something unrelated, gently steer them back to learning computer science, DSA, and technical aptitude.`,
      }
    });

    const textReply = response.text || "I'm sorry, I couldn't generate a response.";
    res.json({ reply: textReply });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: error.message || 'Error processing AI chat request.' });
  }
});

// Secure server-side AI explanation endpoint
app.post('/api/explain', async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server. Please add it in Settings > Secrets.' });
  }

  const { question, selectedOption, correctOption, options } = req.body;

  try {
    const prompt = `
Question: ${question}
Options: ${JSON.stringify(options)}
Student's Selected Answer: ${selectedOption}
Correct Answer: ${correctOption}

Please generate an expert, highly accurate, and friendly educational explanation of why the correct answer is indeed "${correctOption}" and why the other options are incorrect.
Format your response beautifully with markdown:
- **Concept Breakdown**: Explain the fundamental computer science or mathematical concept behind the question.
- **Detailed Step-by-Step Solution**: Show the mathematical steps, C++/Python/Java code trace, or logical reasoning.
- **Why the Selected Option was ${selectedOption === correctOption ? 'Correct' : 'Incorrect'}**: Provide targeted feedback to help the student learn from this attempt.
- **Pro Tip**: Give a mnemonic, speed-running trick, or clean tip for solving similar problems fast.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    res.json({ explanation: response.text });
  } catch (error: any) {
    console.error('Error in /api/explain:', error);
    res.status(500).json({ error: error.message || 'Error generating AI explanation.' });
  }
});

// Secure server-side dynamic AI Quiz generation endpoint
app.post('/api/generate-questions', async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server. Please add it in Settings > Secrets.' });
  }

  const { topic, difficulty } = req.body;

  try {
    const prompt = `
Generate 3 high-quality multiple choice questions for the topic "${topic}" with difficulty level "${difficulty}".
The topic might be a Data Structure, Algorithm, or Aptitude Category (e.g. Dynamic Programming, Trees, Binary Search, Quant, Python, Sorting).
Respond ONLY with a valid JSON array of question objects, matching this TypeScript interface exactly, with NO markdown backticks in your outer response (it should be raw JSON string):

interface QuizQuestion {
  id: number; // unique random numbers
  company: string; // choose a relevant tech company (e.g., Google, Amazon, TCS, Infosys, Accenture)
  topic: string;
  level: 'Easy' | 'Medium' | 'Hard' | 'Advanced';
  question: string;
  options: string[]; // exactly 4 options
  answer: string; // must match one of the elements in the options array exactly
  explanation: string; // brief, clear explanation
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const questionsJson = JSON.parse(response.text || '[]');
    res.json({ questions: questionsJson });
  } catch (error: any) {
    console.error('Error generating questions via AI:', error);
    res.status(500).json({ error: 'Failed to generate custom AI questions. Returning default local questions instead.' });
  }
});

// Secure server-side dynamic AI Quiz parsing endpoint (from pasted text or URL)
app.post('/api/parse-questions', async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server. Please add it in Settings > Secrets.' });
  }

  const { text, url } = req.body;
  let textToParse = text || '';

  try {
    if (url && url.trim().startsWith('http')) {
      console.log('Fetching content from URL:', url);
      const fetchResponse = await fetch(url.trim(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
      });
      if (!fetchResponse.ok) {
        throw new Error(`Failed to fetch URL: ${fetchResponse.statusText}`);
      }
      const html = await fetchResponse.text();
      // Simple html-to-text strip so we don't blow up token limits
      textToParse = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ')
                        .trim();
    }

    if (!textToParse || textToParse.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide valid text content or a link with readable data.' });
    }

    // Limit length to avoid overloading Gemini
    const truncatedText = textToParse.slice(0, 30000);

    const prompt = `
You are an advanced educational AI. Your job is to parse the raw text content or document data below and extract high-quality multiple choice questions (MCQs) related to Computer Science, Data Structures, Algorithms, Programming, Aptitude, or Quant/Math.

Task:
1. Extract or construct up to 10 valid multiple choice questions.
2. For each question, categorize it under a relevant company (e.g. TCS, Google, Amazon, Infosys, Accenture, etc.), a topic, and a difficulty level ('Easy', 'Medium', 'Hard', 'Advanced').
3. For each question, provide exactly 4 options and the single correct answer string that matches one option EXACTLY.
4. Provide a clear, robust step-by-step explanation.

Raw Text Content to Parse:
---
${truncatedText}
---

Respond ONLY with a valid JSON array of question objects, matching this TypeScript interface exactly. Return nothing else, just the JSON array:

interface QuizQuestion {
  id: number; // unique random positive integer
  company: string; // Relevant tech company
  topic: string; // e.g. "Arithmetic", "Logical", "Programming Logic", "Trees", "Graphs", "Dynamic Programming", etc.
  level: 'Easy' | 'Medium' | 'Hard' | 'Advanced';
  question: string;
  options: string[]; // exactly 4 options
  answer: string; // must match one of the elements in the options array exactly
  explanation: string; // clear educational step-by-step explanation
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const parsedQuestions = JSON.parse(response.text || '[]');
    res.json({ questions: parsedQuestions });
  } catch (error: any) {
    console.error('Error parsing questions via AI:', error);
    res.status(500).json({ error: error.message || 'Failed to parse questions using Gemini.' });
  }
});

// --- VITE MIDDLEWARE / STATIC SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in Development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production build files from dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
