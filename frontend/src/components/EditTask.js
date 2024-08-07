import React, { useState, useEffect } from 'react';

function EditTask({ task, onSave, onCancel }) {
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  useEffect(() => {
    setUpdatedTask({ ...task });
  }, [task]);

  const handleSave = () => {
    onSave(updatedTask);
  };

  return (
    <div className="edit-task-modal">
      <h2>Edit Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={updatedTask.title}
        onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={updatedTask.description}
        onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
      />
      <input
        type="date"
        value={updatedTask.due_date}
        onChange={(e) => setUpdatedTask({ ...updatedTask, due_date: e.target.value })}
      />
      <select
        value={updatedTask.completed ? 'completed' : 'not_completed'}
        onChange={(e) => setUpdatedTask({ ...updatedTask, completed: e.target.value === 'completed' })}
      >
        <option value="not_completed">Not Completed</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditTask;
