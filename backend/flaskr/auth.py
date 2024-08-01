from flask import Blueprint, request, jsonify
from .db import get_db
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint("auth_bp", __name__, url_prefix="/api/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    db = get_db()
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'])
    db.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        (data['username'], data['email'], hashed_password)
    )
    db.commit()
    user_id = db.execute(
        'SELECT userID FROM users WHERE username = ?', (data['username'],)
    ).fetchone()
    return jsonify({"user_id": f"{user_id}"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    db = get_db()
    data = request.get_json()
    user = db.execute(
        'SELECT * FROM users WHERE username = ?', (data['username'],)
    ).fetchone()
    user_id = db.execute(
        'SELECT userID FROM users WHERE username = ?', (data['username'],)
    ).fetchone()
    if user and check_password_hash(user['password'], data['password']):
        return jsonify({"userID": f"{user_id}"}), 200
    return jsonify({"error": "Invalid credentials"}), 401
