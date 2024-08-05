import React, { useState, useEffect } from 'react';

function Main() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from your backend
    const fetchTasks = async () => {
      try {
        const userID = localStorage.getItem('userID'); // Retrieve the logged-in user's ID
        if (!userID) {
          console.error('User ID not found');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/users/${userID}/tasks`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
            <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
