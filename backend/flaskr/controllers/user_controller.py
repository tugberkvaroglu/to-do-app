from flask import Blueprint, request, jsonify

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/", methods=["GET"])
def get_user():
    #TODO: implement GET request of the user entity
    pass

@user_bp.route("/", methods=["PUT"])
def update_user():
    #TODO: implement PUT request of the user entity
    pass