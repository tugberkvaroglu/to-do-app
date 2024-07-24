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