"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/', methods=['POST', 'GET'])
def backend_check():

    return jsonify({"message": "GOOD NEWS! Backend is running good job ;)"}), 200


@api.route("/signup", methods=["POST"])
def create_user():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    db_match = User.query.filter_by(email = email).all()
    if len(db_match) is not 0:
        return jsonify({"message": "User already has an account"}), 412
    
    user = User(
        username = username,
        email = email,
        password = password,
        is_active = True
    )

    db.session.add(user)
    db.session.commit()
    
    return jsonify({ "message": "Added new account" }), 201


@api.route("/login", methods=["POST"])
def authenticate_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()

    if email != user.email:
        return jsonify({"message": "You don't have an account"}), 404

    if user is None:
        return jsonify({"message": "Wrong email or password :("}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "username": user.username })


@api.route("/welcome", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.username}), 200