"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/signup", methods=["POST"])
def create_user():
    new_user = request.get_json()

    db_match = User.query.filter_by(email = new_user['email']).all()
    if len(db_match) != 0:
        return jsonify({"message": "User already has an account"}), 400
    
    new_user = User(
        username = new_user['username'],
        password = new_user['password'],
        email = new_user['email']
    )

    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({ "message": "Added new account" }), 200


@api.route("/login", methods=["POST"])
def authenticate_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"message": "Wrong email or password :("}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token})


@api.route("/welcome", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"username": user.username}), 200