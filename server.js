const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory todo storage
let todos = [];
let nextId = 1;

// GET /todos - list all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos - add a new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const todo = { id: nextId++, text, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// DELETE /todos/:id - delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  const [deleted] = todos.splice(index, 1);
  res.json(deleted);
});

// PATCH /todos/:id - update a todo (toggle completed)
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  if (typeof req.body.completed === 'boolean') {
    todo.completed = req.body.completed;
  }
  res.json(todo);
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
