from flask import Blueprint, request, jsonify
from .db import get_db

task_bp = Blueprint("task_bp", __name__, url_prefix="/api/tasks")

@task_bp.route("/<int:task_id>", methods=["GET"])
def get_task(task_id):
    db = get_db()
    task = db.execute('SELECT * FROM tasks WHERE id = ?', (task_id,)).fetchone()
    if task:
        return jsonify(dict(task)), 200
    return jsonify({"error": "Task not found"}), 404

@task_bp.route("/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    db = get_db()
    data = request.get_json()
    db.execute(
        'UPDATE tasks SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?',
        (data['title'], data['description'], data['due_date'], data['completed'], task_id)
    )
    db.commit()
    return jsonify({"message": "Task updated successfully"}), 200

@task_bp.route("/", methods=["POST"])
def create_task():
    db = get_db()
    data = request.get_json()
    db.execute(
        'INSERT INTO tasks (user_id, title, description, due_date, completed) VALUES (?, ?, ?, ?, ?)',
        (data['user_id'], data['title'], data['description'], data['due_date'], data['completed'])
    )
    db.commit()
    return jsonify({"message": "Task created successfully"}), 201
