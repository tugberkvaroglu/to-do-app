import React, { useState, useEffect } from 'react';
import '../App.css';
import TaskCard from './TaskCard';
import EditTask from './EditTask';

function Main() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State for add task panel visibility
  const [editingTask, setEditingTask] = useState(null); // State for editing task modal visibility

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
        const newTaskFromServer = await response.json();
        setTasks((prevTasks) => {
          const updatedTasks = [...prevTasks, newTaskFromServer].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
          return updatedTasks;
        });
        setNewTask({ title: '', description: '', due_date: '' });
        setErrorMessage(''); // Clear the error message if tasks are successfully added
        setIsPanelOpen(false); // Close the panel after adding the task
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

  return (
    <div>
      <h1>Task List</h1>
      {errorMessage && tasks.length === 0 && <p>{errorMessage}</p>}
      <ul>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={() => setEditingTask(task)} onDelete={handleDeleteTask} />
        ))}
      </ul>
      <button className="add-task-btn" onClick={() => setIsPanelOpen(true)}>Add Task</button>
      
      {isPanelOpen && (
        <div className="add-task-panel">
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
        </div>
      )}
      
      {editingTask && (
        <EditTask task={editingTask} onSave={handleEditTask} onCancel={() => setEditingTask(null)} />
      )}
    </div>
  );
}

export default Main;
