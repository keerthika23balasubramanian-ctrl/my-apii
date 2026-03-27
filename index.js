const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let tasks = [];
let id = 1;

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET one task
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// POST create task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: id++,
    title,
    status: "pending"
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.title = req.body.title || task.title;
  task.status = req.body.status || task.status;

  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Task not found" });

  tasks.splice(index, 1);
  res.json({ message: "Deleted successfully" });
});

// 404 route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});