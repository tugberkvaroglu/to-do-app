from datetime import datetime
from flask import Blueprint, request, jsonify
from .db import get_db

user_bp = Blueprint("user_bp", __name__, url_prefix="/api/users")

@user_bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    db = get_db()
    user = db.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
    if user:
        return jsonify(dict(user)), 200
    return jsonify({"error": "User not found"}), 404

@user_bp.route("/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    db = get_db()
    data = request.get_json()
    db.execute(
        'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
        (data['username'], data['email'], data['password'], user_id)
    )
    db.commit()
    return jsonify({"message": "User updated successfully"}), 200

@user_bp.route("/", methods=["GET"])
def get_users():
    db = get_db()
    user = db.execute('SELECT * FROM users').fetchone()
    if user:
        return jsonify(dict(user)), 200
    return jsonify({"error": "User not found"}), 404

@user_bp.route("/<int:user_id>/tasks", methods=["GET"])
def get_user_tasks(user_id):
    try:
        db = get_db()
        tasks = db.execute('SELECT * FROM tasks WHERE user_id = ?', (user_id,)).fetchall()

        # Convert tasks to a list of dictionaries
        task_list = []
        for task in tasks:
            # Assuming task['due_date'] is the field causing the issue
            try:
                date_obj = datetime.strptime(task['due_date'], '%a, %d %b %Y %H:%M:%S %Z')
                task_date = date_obj.strftime('%d-%m-%Y')
            except ValueError:
                task_date = task['due_date']  # If already in correct format or conversion fails
            task_dict = {
                'id': task['id'],
                'title': task['title'],
                'description': task['description'],
                'due_date': task_date,
                'completed': task['completed'],
                'user_id': task['user_id']
            }
            task_list.append(task_dict)

        return jsonify(task_list)

    except Exception as e:
        print(e)
        return jsonify({'error': 'An error occurred while fetching tasks'}), 500

@user_bp.route("/<int:user_id>/tasks/<int:task_id>", methods=["GET"])
def get_user_task(user_id, task_id):
    db = get_db()
    task = db.execute('SELECT * FROM tasks WHERE id = ? AND user_id = ?', (task_id, user_id)).fetchone()
    if task:
        return jsonify(dict(task)), 200
    return jsonify({"error": "Task not found for this user"}), 404

@user_bp.route("/<int:user_id>/tasks", methods=["POST"])
def create_user_task(user_id):
    db = get_db()
    data = request.get_json()
    due_date = datetime.strptime(data['due_date'], '%Y-%m-%d').strftime('%Y-%m-%d')
    db.execute(
        'INSERT INTO tasks (user_id, title, description, due_date, completed) VALUES (?, ?, ?, ?, ?)',
        (user_id, data['title'], data['description'], due_date, data['completed'])
    )
    db.commit()
    return jsonify({"message": "Task created successfully"}), 201

@user_bp.route("/<int:user_id>/tasks/<int:task_id>", methods=["PUT"])
def update_user_task(user_id, task_id):
    db = get_db()
    data = request.get_json()
    db.execute(
        'UPDATE tasks SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ? AND user_id = ?',
        (data['title'], data['description'], data['due_date'], data['completed'], task_id, user_id)
    )
    db.commit()
    return jsonify({"message": "Task updated successfully"}), 200

@user_bp.route("/<int:user_id>/tasks/<int:task_id>", methods=["DELETE"])
def delete_user_task(user_id, task_id):
    db = get_db()
    db.execute(
        'DELETE FROM tasks WHERE id = ? AND user_id = ?',
        (task_id, user_id)
    )
    db.commit()
    return jsonify({"message": "Task deleted successfully"}), 200