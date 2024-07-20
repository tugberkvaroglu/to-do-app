from flask import Blueprint, render_template, url_for, flash, redirect, request, jsonify
from backend import db, bcrypt
from backend.forms import RegistrationForm, LoginForm
from backend.models import User, Todo
from flask_login import login_user, current_user, logout_user, login_required

bp = Blueprint('main', __name__)

@bp.route("/")
@bp.route("/home")
def home():
    return render_template('home.html')

@bp.route("/api/test_db")
def test_db():
    users = User.query.all()
    return jsonify([user.username for user in users])