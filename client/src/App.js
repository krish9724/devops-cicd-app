import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchHealth();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Could not fetch tasks', err);
    }
  };

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setHealth(data);
    } catch (err) {
      setHealth({ status: 'unreachable' });
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask }),
    });
    const task = await res.json();
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = async (id) => {
    const res = await fetch(`/api/tasks/${id}`, { method: 'PUT' });
    const updated = await res.json();
    setTasks(tasks.map(t => (t.id === id ? updated : t)));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 DevOps CI/CD Task Manager</h1>
        <div className={`health-badge ${health?.status === 'healthy' ? 'online' : 'offline'}`}>
          API: {health?.status || 'checking...'}
        </div>
      </header>

      <main className="main">
        <div className="add-task">
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.done ? 'done' : ''}>
              <span onClick={() => toggleTask(task.id)}>{task.title}</span>
              <span className="status">{task.done ? '✅' : '⏳'}</span>
            </li>
          ))}
        </ul>
      </main>

      <footer className="footer">
        <p>Built with React + Node.js | Deployed via GitHub Actions + Docker Hub</p>
      </footer>
    </div>
  );
}

export default App;
