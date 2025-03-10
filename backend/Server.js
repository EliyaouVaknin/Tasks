require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const users = [
  { id: 1, role: 'admin', email: 'admin@example.com', password: bcrypt.hashSync('123', 10) },
];

const tasks = [];

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    req.user = decoded;
    next();
  });
};

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token: `Bearer ${token}`, user: { id: user.id, role: user.role, email: user.email }, tasks });
});

app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists. Please log in.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      role: 'user',
      email,
      password: hashedPassword
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.status(201).json({
      message: 'Registration successful!',
      token,
      user: { id: newUser.id, email: newUser.email, role: newUser.role }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/tasks', verifyToken, (req, res) => {
  debugger;
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }
  const newTask = {
    id: uuidv4(),
    title,
    description,
    status: status || false,
  };

  tasks.push(newTask);

  res.status(201).json({ message: 'Task created successfully', task: newTask });
});

app.put('/api/tasks/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { title, description, status, isUpdateStatus } = req.body;

  const task = tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (isUpdateStatus) {
    task.status = !task.status;
  } else {
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
  }

  res.json({ message: 'Task updated successfully', task });
});

app.delete('/api/tasks/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully' });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
