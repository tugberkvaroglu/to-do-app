import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or '5d109b264284c5ee051dac89f1d69eae'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://tugberk:357535+-Tv@localhost/my_todo_app_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
