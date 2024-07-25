import React, { useState, useEffect } from 'react';

function Main() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from your backend
    const fetchTasks = async () => {

        const userID = localStorage.getItem('userID'); // Retrieve user ID

        if (!userID) {
          // Handle case where user ID is not found
          console.error('User ID not found');
          return;
        }

      try {
        const response = await fetch('http://localhost:5000/api/users/${userID}/tasks/');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Main Page - To-Do List</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
