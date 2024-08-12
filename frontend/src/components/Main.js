import React, { useState, useEffect } from 'react';
import '../App.css';
import TaskCard from './TaskCard';
import EditTask from './EditTask';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completedToday, setCompletedToday] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userID = localStorage.getItem('userID');
        if (!userID) {
          console.error('User ID not found');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/users/${userID}/tasks`);
        if (response.ok) {
          const data = await response.json();
          if (data.length === 0) {
            setErrorMessage('User tasks not found');
          } else {
            setErrorMessage('');
            const today = new Date().toISOString().split('T')[0];
            const completedTasksToday = data.filter(task => task.completed && task.due_date === today);
            setCompletedToday(completedTasksToday.length > 0);
            setCompletedTasks(completedTasksToday);
          }
          setTasks(data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)));
        } else if (response.status === 404) {
          setErrorMessage('User tasks not found');
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        console.error('User ID not found');
        return;
      }

      const taskToAdd = { ...newTask, completed: false };

      const response = await fetch(`http://localhost:5000/api/users/${userID}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskToAdd),
      });

      if (response.ok) {
        window.location.reload(); // Refresh the page after adding the task
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        console.error('User ID not found');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/users/${userID}/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        setEditingTask(null); // Close the edit task modal
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        console.error('User ID not found');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/users/${userID}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userID');
    navigate('/login');
    window.location.reload(); // Refresh the page after logging out
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const calendar = [];
    let dayCounter = 1;

    for (let week = 0; week < 6; week++) {
      const weekRow = [];
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < firstDayOfMonth) {
          weekRow.push(<td key={`${week}-${day}`}></td>);
        } else if (dayCounter <= daysInMonth) {
          const isToday = today.getDate() === dayCounter;
          const isCompletedToday = isToday && completedToday;

          weekRow.push(
            <td
              key={`${week}-${day}`}
              className={isCompletedToday ? 'completed-today' : isToday ? 'today' : ''}
              onClick={() => isCompletedToday && alert(`Tasks completed today:\n${completedTasks.map(task => task.title).join('\n')}`)}
            >
              {dayCounter}
            </td>
          );
          dayCounter++;
        } else {
          weekRow.push(<td key={`${week}-${day}`}></td>);
        }
      }
      calendar.push(<tr key={week}>{weekRow}</tr>);
    }

    return (
      <table className="calendar">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {calendar}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container">
      {isMenuOpen && <div className="side-menu">Menu content goes here</div>}
      <div className="main-content">
        <div className="task-section">
          <div className="top-bar">
            <button className="left-button" onClick={toggleMenu}>☰</button>
            <h1 className="top-bar-title">Task List</h1>
            <button className="right-button" onClick={handleLogout}>Logout</button>
          </div>
          {errorMessage && tasks.length === 0 && <p>{errorMessage}</p>}
          <ul>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={() => setEditingTask(task)} onDelete={handleDeleteTask} />
            ))}
          </ul>
          <button className="add-task-btn" onClick={() => setIsPanelOpen(true)}>Add Task</button>
          
          <Modal isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
            <h2>Add New Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
              type="date"
              value={newTask.due_date}
              onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
            />
            <button onClick={handleAddTask}>Add Task</button>
            <button className="close-panel-btn" onClick={() => setIsPanelOpen(false)}>Close</button>
          </Modal>
          
          {editingTask && (
            <EditTask task={editingTask} onSave={handleEditTask} onCancel={() => setEditingTask(null)} />
          )}
        </div>
        <div className="calendar-section">
          <h2>Progress Calendar</h2>
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
}

export default Main;
