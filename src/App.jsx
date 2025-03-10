import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './Components/MainPage';
import TasksPage from './Components/TasksPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState([])

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setTasks(data.tasks)
        setToken(data.token)
        setCurrentUser(data.user);
        redirect('/tasks');
      } else {
        return data.message;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      debugger;
      if (res.ok) {
        localStorage.setItem('token', data.token);
        return null;
      } else {
        return data.message;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return "Something went wrong! Please try again later.";
    }
  };

  const addNewTask = async (newTask) => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const savedTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, savedTask.task]);
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskStatus = async (task) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { 
          'Content-Type': 'application/json',
          'authorization': token
         },
        body: JSON.stringify({ isUpdateStatus: true, task }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      const resAsJson = await response.json();
      const updatedTask = resAsJson.task

      setTasks(tasks.map(currentTask =>
        currentTask.id === task.id ? { ...updatedTask } : currentTask
      ));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const updateTaskText = async (id, title, description) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PUT",
        headers: { 
          'Content-Type': 'application/json',
          'authorization': token
         },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks(tasks.map(task => (task.id === id ? updatedTask.task : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { 
          'authorization': token
         },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
            element={currentUser ? <Navigate to="/tasks" /> : <MainPage handleLogin={handleLogin} handleRegister={handleRegister} />}
          />
          <Route path="/tasks" element={currentUser ?
            <TasksPage
              tasks={tasks}
              currentUser={currentUser}
              updateTaskStatus={updateTaskStatus}
              updateTaskText={updateTaskText}
              deleteTask={deleteTask}
              handleLogout={handleLogout}
              addNewTask={addNewTask}
            /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
