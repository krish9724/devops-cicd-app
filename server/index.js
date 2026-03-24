const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample data
const tasks = [
  { id: 1, title: 'Set up GitHub Repository', done: true },
  { id: 2, title: 'Write Dockerfile', done: true },
  { id: 3, title: 'Configure GitHub Actions', done: false },
  { id: 4, title: 'Push to Docker Hub', done: false },
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'DevOps CI/CD App - Backend Running!', version: '1.0.0' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = { id: Date.now(), title: req.body.title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.done = !task.done;
  res.json(task);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
