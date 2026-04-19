require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const tasks = [
  { id: 1, title: 'Set up GitHub Repository', done: true, priority: 'High', reason: 'Foundational for all coding', deadline_days: 1, summary: 'Create initial repo' },
  { id: 2, title: 'Write Dockerfile', done: true, priority: 'High', reason: 'Essential for containerization', deadline_days: 2, summary: 'Containerize backend' },
  { id: 3, title: 'Configure GitHub Actions', done: false, priority: 'Medium', reason: 'Crucial for CI/CD setup', deadline_days: 3, summary: 'Automate pipeline' },
  { id: 4, title: 'Push to Docker Hub', done: false, priority: 'Low', reason: 'Can be done after CI/CD', deadline_days: 5, summary: 'Publish image' },
];

// Root route now handled by express.static

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });

    let aiData = { priority: 'Medium', reason: 'Standard prioritization', deadline_days: 7, summary: title };

    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are a task management assistant.
Task: "${title}"
Reply ONLY in this exact JSON format, nothing else:
{"priority": "High/Medium/Low", "reason": "one line reason", "deadline_days": 3, "summary": "one line summary"}`
                }]
              }]
            })
          }
        );
        const data = await response.json();
        if (!data.error && data.candidates && data.candidates[0]) {
          const text = data.candidates[0].content.parts[0].text;
          const clean = text.replace(/```json|```/g, '').trim();
          const result = JSON.parse(clean);
          if (result.priority) aiData.priority = result.priority;
          if (result.reason) aiData.reason = result.reason;
          if (result.deadline_days) aiData.deadline_days = result.deadline_days;
          if (result.summary) aiData.summary = result.summary;
        }
      } catch (err) {
        console.error('AI Suggestion failed during task creation:', err.message);
      }
    }

    const newTask = {
      id: Date.now(),
      title,
      done: false,
      priority: aiData.priority,
      reason: aiData.reason,
      deadline_days: aiData.deadline_days,
      summary: aiData.summary
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.done = !task.done;
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.post('/api/ai/suggest', async (req, res) => {
  try {
    const { taskTitle } = req.body;
    if (!taskTitle) return res.status(400).json({ error: 'taskTitle is required' });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a task management assistant.
Task: "${taskTitle}"
Reply ONLY in this exact JSON format, nothing else:
{"priority": "High/Medium/Low", "reason": "one line reason", "deadline_days": 3, "summary": "one line summary"}`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.candidates[0].content.parts[0].text;
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    res.json(result);
  } catch (err) {
    console.error('AI Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'message is required' });

    if (!process.env.GEMINI_API_KEY) {
      return res.json({ reply: 'Development mode: Please configure your GEMINI_API_KEY in the .env file to talk to the AI!' });
    }

    const taskContext = tasks.map(t => `- ${t.title} [${t.priority} Priority] (Done: ${t.done})`).join('\n');
    const prompt = `You are a helpful AI Task Management Assistant. 
Here are the current tasks in the system:
${taskContext}

User asks: "${message}"
Respond concisely and naturally like an AI assistant. Help the user manage or understand their tasks.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    
    const reply = data.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (err) {
    console.error('AI Chat Error:', err.message);
    res.status(500).json({ error: 'Failed to communicate with AI' });
  }
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;