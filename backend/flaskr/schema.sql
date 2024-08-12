DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;

-- Create users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date TEXT,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (username, email, password) VALUES
('user1', 'user1@example.com', 'password1'),
('user2', 'user2@example.com', 'password2'),
('user3', 'user3@example.com', 'password3');

-- Insert dummy tasks for user1
INSERT INTO tasks (user_id, title, description, due_date, completed) VALUES
(1, 'Sample Task 1', 'This is a sample task description', '12-10-2024', 0),
(1, 'Sample Task 2', 'This is a sample task description', '12-10-2024', 0);

-- Insert dummy tasks for user2
INSERT INTO tasks (user_id, title, description, due_date, completed) VALUES
(2, 'Task 1 for user2', 'Description for task 1 of user2', '2024-07-27', 0),
(2, 'Task 2 for user2', 'Description for task 2 of user2', '2024-07-28', 1);

-- Insert dummy tasks for user3
INSERT INTO tasks (user_id, title, description, due_date, completed) VALUES
(3, 'Task 1 for user3', 'Description for task 1 of user3', '2024-07-29', 0),
(3, 'Task 2 for user3', 'Description for task 2 of user3', '2024-07-30', 1);