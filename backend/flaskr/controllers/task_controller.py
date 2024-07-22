from flask import Blueprint, request, jsonify

task_bp = Blueprint("task_bp", __name__)

@task_bp.route("/", methods=["GET"])
def get_task():
    #TODO: implement GET request of the user entity
    pass

@task_bp.route("/", methods=["PUT"])
def update_task():
    #TODO: implement PUT request of the user entity
    pass

@task_bp.route("/", methods=["POST"])
def create_task():
    #TODO: implement POST request of the user entity
    pass