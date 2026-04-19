import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [health, setHealth] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ sender: 'ai', text: 'Hi! I am your AI assistant. Ask me anything about your tasks!' }]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
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

    fetchTasks();
    fetchHealth();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    setIsAdding(true);
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask }),
      });
      const task = await res.json();
      setTasks([...tasks, task]);
      setNewTask('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
    setIsAdding(false);
  };

  const toggleTask = async (id) => {
    const res = await fetch(`/api/tasks/${id}`, { method: 'PUT' });
    const updated = await res.json();
    setTasks(tasks.map(t => (t.id === id ? updated : t)));
  };

  const deleteTask = async (id, e) => {
    e.stopPropagation();
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const newMessages = [...chatMessages, { sender: 'user', text: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatInput }),
      });
      const data = await res.json();
      const responseText = data.reply || (data.error ? "API Error: " + data.error : 'Sorry, I encountered an unknown error.');
      setChatMessages([...newMessages, { sender: 'ai', text: responseText }]);
    } catch (err) {
      setChatMessages([...newMessages, { sender: 'ai', text: 'Network error. Please try again later.' }]);
    }
    setIsChatLoading(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>✨ AI Task Manager</h1>
        <div className={`health-badge ${health?.status === 'healthy' ? 'online' : 'offline'}`}>
          API: {health?.status || 'checking...'}
        </div>
      </header>

      <main className="main">
        <div className="add-task">
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !isAdding && addTask()}
            placeholder="Add a new task..."
            disabled={isAdding}
          />
          <button onClick={addTask} disabled={isAdding}>
            {isAdding ? '🤖 Thinking...' : 'Add'}
          </button>
        </div>

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
              <div className="task-content" onClick={() => toggleTask(task.id)}>
                <div className="task-header">
                  <span className="task-title">{task.title}</span>
                  {task.priority && (
                    <span className={`badge priority-${task.priority.toLowerCase()}`}>
                      {task.priority} Priority
                    </span>
                  )}
                </div>
                {task.summary && (
                  <div className="task-details">
                    <p className="summary">🤖 <span className="ai-text">{task.summary}</span></p>
                    <div className="meta">
                      {task.deadline_days && <span className="deadline">⏳ Deadline in {task.deadline_days} days</span>}
                      {task.reason && <span className="reason" title={task.reason}>ℹ️ Why?</span>}
                    </div>
                  </div>
                )}
              </div>
              <div className="task-actions">
                <span className="status" onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}>{task.done ? '✅' : '⏳'}</span>
                <span className="delete-btn" title="Delete Task" onClick={(e) => deleteTask(task.id, e)}>🗑️</span>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="footer">
        <p>Built with React + Node.js | Deployed via GitHub Actions + Docker Hub</p>
      </footer>

      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>🤖 AI Task Assistant</h4>
            <button onClick={() => setIsChatOpen(false)}>✖</button>
          </div>
          <div className="chat-body">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {isChatLoading && <div className="chat-message ai"><p>Thinking...</p></div>}
          </div>
          <div className="chat-footer">
            <input 
              value={chatInput} 
              onChange={e => setChatInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && sendChatMessage()}
              placeholder="Ask something..." 
            />
            <button onClick={sendChatMessage}>Send</button>
          </div>
        </div>
      )}

      <button className="chat-widget-btn" onClick={() => setIsChatOpen(!isChatOpen)}>
        {isChatOpen ? '✖' : '💬'} 
      </button>
    </div>
  );
}

export default App;
