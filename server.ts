import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { getFallbackQuestions } from './fallbackQuestions';

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

// --- OFFLINE ASSISTANT SYSTEM ---
function getOfflineChatReply(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('tree') || msg.includes('bst') || msg.includes('avl') || msg.includes('red black')) {
    return `### 🌲 Binary Search Tree (BST) & Trees Guide (Offline Mode)
    
*The live AI is currently experiencing high load, but here is a specialized, interactive cheat sheet on Trees!*

A **Binary Search Tree (BST)** is a node-based binary tree data structure which has the following properties:
- The left subtree of a node contains only nodes with keys lesser than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- The left and right subtree must each also be a binary search tree.

#### Visual Representation of a BST:
\`\`\`text
        [8]
       /   \\
     [3]   [10]
    /   \\     \\
  [1]   [6]   [14]
       /   \\  /
     [4]  [7][13]
\`\`\`

#### Essential Traversal Sequences:
1. **In-order (Left, Root, Right)**: Yields elements in non-decreasing sorted order: \`1, 3, 4, 6, 7, 8, 10, 13, 14\`
2. **Pre-order (Root, Left, Right)**: Useful for copying trees: \`8, 3, 1, 6, 4, 7, 10, 14, 13\`
3. **Post-order (Left, Right, Root)**: Useful for deleting trees: \`1, 4, 7, 6, 3, 13, 14, 10, 8\`

#### Time Complexities:
- **Search / Insert / Delete**:
  - *Average Case*: \`O(log N)\` (When the tree is balanced)
  - *Worst Case*: \`O(N)\` (When the tree degenerates into a linear chain/skewed tree)`;
  }
  
  if (msg.includes('sort') || msg.includes('bubble') || msg.includes('merge') || msg.includes('quick') || msg.includes('heap') || msg.includes('insertion') || msg.includes('selection')) {
    return `### 📊 Sorting Algorithms Interactive Guide (Offline Mode)
    
*The live AI is currently experiencing high load, but here is a specialized, interactive guide on Sorting Algorithms!*

Sorting algorithms arrange elements in a list in a specific order (ascending or descending).

| Algorithm | Best Time | Average Time | Worst Time | Space Complexity | Stable? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | O(N) | O(N²) | O(N²) | O(1) | Yes |
| **Insertion Sort** | O(N) | O(N²) | O(N²) | O(1) | Yes |
| **Selection Sort** | O(N²) | O(N²) | O(N²) | O(1) | No |
| **Merge Sort** | O(N log N) | O(N log N) | O(N log N) | O(N) | Yes |
| **Quick Sort** | O(N log N) | O(N log N) | O(N²) | O(log N) | No |
| **Heap Sort** | O(N log N) | O(N log N) | O(N log N) | O(1) | No |

#### Pro Tip - Quick Sort Pivot Selection:
Choosing a random pivot or median-of-three pivot is crucial to avoid the worst-case \`O(N²)\` performance on already sorted or reverse-sorted input!`;
  }
  
  if (msg.includes('graph') || msg.includes('bfs') || msg.includes('dfs') || msg.includes('dijkstra') || msg.includes('bellman') || msg.includes('floyd') || msg.includes('mst')) {
    return `### 🕸️ Graph Algorithms Guide (Offline Mode)
    
*The live AI is currently experiencing high load, but here is a specialized guide on Graphs!*

Graphs are non-linear data structures made up of vertices (V) and edges (E).

#### 1. Breadth-First Search (BFS)
- **Concept**: Explores nodes level-by-level using a **Queue**.
- **Use Case**: Finding the shortest path in unweighted graphs.
- **Time Complexity**: \`O(V + E)\`

#### 2. Depth-First Search (DFS)
- **Concept**: Explores as deep as possible along each branch before backtracking using a **Stack** or **Recursion**.
- **Use Case**: Finding connected components, cycles, and topological sorting.
- **Time Complexity**: \`O(V + E)\`

#### 3. Dijkstra's Shortest Path Algorithm
- **Concept**: Greedy algorithm that finds the shortest path from a single source vertex to all other vertices.
- **Constraint**: Edge weights **must be non-negative**.
- **Time Complexity**: \`O((V + E) log V)\` using a min-heap.`;
  }
  
  if (msg.includes('linked list') || msg.includes('list') || msg.includes('node') || msg.includes('singly') || msg.includes('doubly')) {
    return `### 🔗 Linked List Guide (Offline Mode)
    
*The live AI is currently experiencing high load, but here is a specialized guide on Linked Lists!*

A **Linked List** is a linear data structure where elements are not stored at contiguous memory locations. Instead, elements are linked using pointers.

#### Visual Structure:
\`\`\`text
Singly Linked List:
[Head: 10] ---> [20] ---> [30] ---> [NULL]

Doubly Linked List:
[Head: 10] <===> [20] <===> [30] ---> [NULL]
\`\`\`

#### Key Comparisons:
- **Array**:
  - *Access*: \`O(1)\`
  - *Insertion/Deletion at arbitrary index*: \`O(N)\` (Requires shifting elements)
- **Linked List**:
  - *Access*: \`O(N)\` (Must traverse sequentially)
  - *Insertion/Deletion at arbitrary index (once position is found)*: \`O(1)\``;
  }
  
  if (msg.includes('dynamic programming') || msg.includes('dp') || msg.includes('knapsack') || msg.includes('lcs') || msg.includes('fibonacci')) {
    return `### 🧠 Dynamic Programming (DP) Demystified (Offline Mode)
    
*The live AI is currently experiencing high load, but here is a specialized guide on Dynamic Programming!*

Dynamic Programming is an algorithmic technique for solving optimization problems by breaking them down into simpler subproblems and utilizing the fact that the optimal solution to the overall problem depends upon the optimal solutions to its subproblems.

#### The Two Core Approaches:
1. **Memoization (Top-Down)**:
   - Starts with the main problem and recursively breaks it down.
   - Caches the results of solved subproblems in a table (e.g., hash map or array) to avoid redundant recalculation.
   
2. **Tabulation (Bottom-Up)**:
   - Solves all subproblems first, starting from the base cases.
   - Fills an iterative table (typically a 1D or 2D array) up to the target answer.
   - Avoids recursive call-stack overhead.

#### Classic Problems:
- **0/1 Knapsack Problem**: Time \`O(N * W)\`, Space \`O(N * W)\`
- **Longest Common Subsequence**: Time \`O(M * N)\`, Space \`O(M * N)\`
- **Coin Change**: Time \`O(Amount * N)\`, Space \`O(Amount)\``;
  }

  if (msg.includes('complexity') || msg.includes('big o') || msg.includes('time complexity') || msg.includes('space complexity')) {
    return `### ⏱️ Time & Space Complexity Cheat Sheet (Offline Mode)
    
*The live AI is currently experiencing high load, but here is a quick reference guide on Complexity Analysis!*

Big O notation describes the upper bound of an algorithm's running time or memory requirements in terms of input size **N**.

#### Common Complexities Ordered from Best to Worst:
1. **Constant Time \`O(1)\`**: Push/pop from a stack, indexing an array, hash map lookups (average case).
2. **Logarithmic Time \`O(log N)\`**: Binary Search, operations on balanced search trees (BST).
3. **Linear Time \`O(N)\`**: Linear search, copying an array, tree traversals.
4. **Log-Linear Time \`O(N log N)\`**: Merge Sort, Heap Sort, Quick Sort (average case).
5. **Quadratic Time \`O(N²)\`**: Bubble Sort, Insertion Sort, nested loops.
6. **Exponential Time \`O(2^N)\`**: Naive recursive Fibonacci, generating subsets.
7. **Factorial Time \`O(N!)\`**: Solving traveling salesperson via brute force, generating permutations.`;
  }

  if (msg.includes('aptitude') || msg.includes('quant') || msg.includes('math') || msg.includes('logical') || msg.includes('puzzle')) {
    return `### ⚡ Placement Aptitude & Quant Speed-Run Tips (Offline Mode)
    
*The live AI is currently experiencing high load, but here are quick speed-run strategies!*

Technical placement drives (like TCS, Infosys, Accenture, Amazon) heavily test Quant and Logical Aptitude. Here are the cheat sheet methods:

#### 1. Time, Speed & Distance
- **Average Speed**: When traveling equal distances at speeds $a$ and $b$, the average speed is:
  $$\\text{Avg Speed} = \\frac{2ab}{a+b}$$
- **Relative Speed**: Same direction $= |s_1 - s_2|$; opposite direction $= s_1 + s_2$.

#### 2. Work & Time
- If $A$ does a job in $x$ days and $B$ does it in $y$ days, together they take:
  $$\\text{Time} = \\frac{xy}{x+y} \\text{ days}$$

#### 3. Unit Digits & Cyclicity
- Unit digits of numbers repeat in patterns of 4 (cyclicity of 4):
  - \`7^1=7, 7^2=9, 7^3=3, 7^4=1\` (cycle is 7, 9, 3, 1)
  - To find unit digit of \`7^95\`, calculate \`95 % 4 = 3\`. So the unit digit is the same as \`7^3\`, which is \`3\`.`;
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('welcome') || msg.includes('greet')) {
    return `### 👋 Welcome to DSA.viz Interactive AI Coach! (Offline Mode)

Hello! I am your visual companion for Data Structures, Algorithms, and Technical Placement Aptitude. 

The live Gemini cloud engine is currently experiencing extremely high demand, so I am running in **Resilient Offline Practice Mode** to ensure your learning is completely uninterrupted!

You can ask me technical questions or ask for guides on:
- **Trees & Binary Search Trees** (BST)
- **Sorting & Searching Algorithms**
- **Graph Algorithms & BFS/DFS**
- **Dynamic Programming** (DP)
- **Linked Lists & Basic Data Structures**
- **Time/Space Complexity Analysis** (Big O)
- **Aptitude, Quant, and Logical Reasoning**

How can I help you master your concepts today?`;
  }

  return `### 🧠 DSA.viz Learning Guide (Offline Resilient Mode)

Thank you for your question! The live Gemini Cloud services are currently experiencing extremely high demand, so I am responding using our local visual syllabus repository.

#### 🚀 Recommended Practice Path:
1. **Interactive Visualization**: Click the tabs at the top of the screen to explore **BST**, **LinkedLists**, and **Sorting** with live step-by-step interactive animations!
2. **Placement Practice**: Head over to the **Placement Prep & AI Lab** to attempt real-world MCQs from top tech companies (TCS, Infosys, Accenture, Amazon, Google).
3. **Boost Question Bank**: If you run out of questions, click the **"Boost Question Bank (+50 Easy MCQs)"** button to load dozens of classic placement questions!

#### 💡 Offline Quick-Answer:
You can ask me about specific topics (like **Trees**, **Sorting**, **Graphs**, **Dynamic Programming**, or **Big O Complexity**) to instantly view detailed interactive breakdowns! Try typing one of those keywords!`;
}

// Robust wrapper for Gemini model calls with retry and backoff on transient errors (503, 429)
async function callGeminiWithRetry(params: any, retries = 3, delay = 1000): Promise<any> {
  if (!ai) {
    throw new Error('Gemini AI SDK is not initialized.');
  }
  let currentParams = { ...params };
  for (let i = 0; i < retries; i++) {
    try {
      return await ai.models.generateContent(currentParams);
    } catch (error: any) {
      const isTransient = error?.status === 503 || 
                          error?.status === 429 ||
                          error?.message?.includes('503') || 
                          error?.message?.includes('429') || 
                          error?.message?.includes('high demand') || 
                          error?.message?.includes('UNAVAILABLE') || 
                          error?.message?.includes('RESOURCE_EXHAUSTED') ||
                          error?.message?.includes('rate limit');
      if (isTransient) {
        if (currentParams.model === 'gemini-3.5-flash') {
          console.log(`Primary model gemini-3.5-flash is experiencing high demand/transient error: ${error?.message || error}. Falling back to gemini-3.1-flash-lite...`);
          currentParams.model = 'gemini-3.1-flash-lite';
          delay = 1000;
          continue;
        }
        if (i < retries - 1) {
          console.log(`Gemini transient error detected on ${currentParams.model}: ${error?.message || error}. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // exponential backoff
          continue;
        }
      }
      throw error;
    }
  }
}

// --- API ENDPOINTS ---

// Secure Server-side API endpoint for Chatbot conversation
app.post('/api/chat', async (req, res) => {
  const { messages, userMessage } = req.body;
  if (!userMessage) {
    return res.status(400).json({ error: 'User message is required.' });
  }

  if (!ai) {
    const offlineReply = getOfflineChatReply(userMessage);
    return res.json({ reply: offlineReply });
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

    const response = await callGeminiWithRetry({
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
    console.log('Gemini chat request failed (Offline Mode active):', error?.message || error);
    const offlineReply = getOfflineChatReply(userMessage);
    res.json({ reply: offlineReply });
  }
});

// Secure server-side AI explanation endpoint
app.post('/api/explain', async (req, res) => {
  const { question, selectedOption, correctOption, options } = req.body;

  if (!ai) {
    const fallbackExp = `### 💡 Study Guide: Problem Analysis (Offline Mode)

*The live AI tutor is currently offline. Here is your structured explanation:*

- **The Correct Answer**: **"${correctOption}"**
  - This option correctly satisfies all constraints, mathematical properties, or execution traces specified in the problem statement.
- **Your Choice ("${selectedOption}")**:
  - ${selectedOption === correctOption ? '🎉 **Your answer is correct!** Excellent job!' : '⚠️ **Your answer is incorrect.** Review the problem constraints and boundary values to avoid common trap choices.'}

*Pro Study Tip:*
Trace the code or logic with a small input (like N=2 or N=3) to verify patterns.`;
    return res.json({ explanation: fallbackExp });
  }

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

    const response = await callGeminiWithRetry({
      model: 'gemini-3.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    res.json({ explanation: response.text });
  } catch (error: any) {
    console.log('Gemini explanation failed (Offline Mode active):', error?.message || error);
    const isCorrect = selectedOption === correctOption;
    const fallbackExp = `### 💡 Study Guide: Problem Analysis (Offline Mode)

*The live AI tutor is currently experiencing high demand. To keep your study session fully active, here is the structured computer science breakdown:*

- **Core Concept**: This question tests fundamental operations, logical constraints, or analysis within **Data Structures, Algorithms, or Placement Aptitude**.
- **The Correct Answer**: **"${correctOption}"**
  - This option correctly satisfies all constraints, mathematical properties, or execution traces specified in the problem statement.
- **Your Choice ("${selectedOption}")**:
  - ${isCorrect ? '🎉 **Your answer is correct!** Excellent job translating the problem requirements into the correct logical output.' : `⚠️ **Your answer is incorrect.** Selecting "${selectedOption}" does not satisfy the requirements. In computer science assessments, verify all loop boundaries, state changes, or arithmetic signs to avoid common trap choices.`}

#### 🎯 Detailed Option Breakdown:
- **Option A**: Must be validated against the specific conditions.
- **Option B**: Often designed as a common distractor or off-by-one boundary value.
- **Option C**: Check if this represents a linear or logarithmic approximation.
- **Option D**: Verify if this is the default or terminal state.

#### ⚡ Pro Study Tip:
When solving MCQ placement questions from top companies:
1. **Eliminate Extremes**: Eliminate options that have incorrect time/space complexities instantly.
2. **Use Small Inputs**: For recursive or dynamic programming traces, trace the code with a small input (like $N=2$ or $N=3$) to identify the pattern fast.
3. **Double-Check Base Cases**: Many questions test edge cases (empty nodes, negative integers, zero division).`;

    res.json({ explanation: fallbackExp });
  }
});

// Secure server-side dynamic AI Quiz generation endpoint
app.post('/api/generate-questions', async (req, res) => {
  const { topic, difficulty, count } = req.body;
  const numQuestions = Math.min(20, Math.max(1, count || 3));

  if (!ai) {
    const fallbackList = getFallbackQuestions(topic, difficulty);
    return res.json({ questions: fallbackList.slice(0, numQuestions) });
  }

  try {
    const prompt = `
    Generate ${numQuestions} high-quality multiple choice questions for the topic "${topic}" with difficulty level "${difficulty}".
    The topic might be a Data Structure, Algorithm, or Aptitude Category (e.g. Dynamic Programming, Trees, Binary Search, Quant, Python, Sorting).
    Respond ONLY with a valid JSON array of question objects, matching this TypeScript interface exactly, with NO markdown backticks in your outer response (it should be raw JSON string):

    interface QuizQuestion {
      id: number; // unique random positive integer
      company: string; // choose a relevant tech company (e.g., Google, Amazon, TCS, Infosys, Accenture)
      topic: string;
      level: 'Easy' | 'Medium' | 'Hard' | 'Advanced';
      question: string;
      options: string[]; // exactly 4 options
      answer: string; // must match one of the elements in the options array exactly
      explanation: string; // brief, clear explanation
    }
    `;

    const response = await callGeminiWithRetry({
      model: 'gemini-3.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const questionsJson = JSON.parse(response.text || '[]');
    res.json({ questions: questionsJson });
  } catch (error: any) {
    console.log('Gemini question generation failed (Offline Mode active):', error?.message || error);
    const fallbackList = getFallbackQuestions(topic, difficulty);
    res.json({ questions: fallbackList });
  }
});

// Secure server-side dynamic AI Quiz parsing endpoint (from pasted text or URL)
app.post('/api/parse-questions', async (req, res) => {
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

    if (!ai) {
      const guessedTopic = textToParse.toLowerCase().includes('tree') ? 'Trees' : 
                           textToParse.toLowerCase().includes('sort') ? 'Sorting' : 
                           textToParse.toLowerCase().includes('dp') || textToParse.toLowerCase().includes('dynamic') ? 'Dynamic Programming' : 'General Aptitude';
      const fallbackList = getFallbackQuestions(guessedTopic, 'Medium');
      return res.json({ questions: fallbackList });
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

    const response = await callGeminiWithRetry({
      model: 'gemini-3.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const parsedQuestions = JSON.parse(response.text || '[]');
    res.json({ questions: parsedQuestions });
  } catch (error: any) {
    console.log('Gemini question parser failed (Offline Mode active):', error?.message || error);
    const guessedTopic = textToParse.toLowerCase().includes('tree') ? 'Trees' : 
                         textToParse.toLowerCase().includes('sort') ? 'Sorting' : 
                         textToParse.toLowerCase().includes('dp') || textToParse.toLowerCase().includes('dynamic') ? 'Dynamic Programming' : 'General Aptitude';
    const fallbackList = getFallbackQuestions(guessedTopic, 'Medium');
    res.json({ questions: fallbackList });
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
