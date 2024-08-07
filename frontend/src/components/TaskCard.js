import React from 'react';

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Invalid Date'}</p>
      <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

export default TaskCard;
