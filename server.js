const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];

// ➕ Add Task
app.post('/api/tasks', (req, res) => {
  const { title, date, priority, status } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: 'Title and Date are required' });
  }

  const newTask = {
    id: Date.now(),
    title,
    date,
    priority: priority || 'Medium',
    status: status || 'Pending',
  };

  tasks.push(newTask);
  res.status(201).json({ message: 'Task added successfully', task: newTask });
});

// 🔁 Get All Tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// ❌ Delete Task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.json({ message: 'Task deleted successfully' });
});

// ✏️ Update Task
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, date, priority, status } = req.body;

  const task = tasks.find((t) => t.id === taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.title = title ?? task.title;
  task.date = date ?? task.date;
  task.priority = priority ?? task.priority;
  task.status = status ?? task.status;

  res.json({ message: 'Task updated successfully', task });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
