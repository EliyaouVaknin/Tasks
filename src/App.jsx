import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './Components/MainPage';
import TasksPage from './Components/TasksPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [users, setUsers] = useState([
    {
      role: 'admin',
      email: 'admin@example.com',
      password: '123'
    }, {
      role: 'user',
      email: 'user@example.com',
      password: '123'
    }]);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'This is the first task', status: false },
    { id: 2, title: 'Task 2', description: 'This is the second task', status: true },
    { id: 3, title: 'Task 3', description: 'This is the third task', status: false }
  ]);

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setCurrentUser(user);
    } else {
      return 'Invalid email or password';
    }
  };

  const updateTaskStatus = (id, completed) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed } : task
    );
    setTasks(updatedTasks);
  };

  const updateTaskText = (id, title, description) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, title, description } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Navigate to="/tasks" /> : <MainPage handleLogin={handleLogin} />}
          />
          <Route path="/tasks" element={currentUser ?
            <TasksPage
              tasks={tasks}
              currentUser={currentUser}
              updateTaskStatus={updateTaskStatus}
              updateTaskText={updateTaskText}
              deleteTask={deleteTask}
              handleLogout={handleLogout}
            /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
