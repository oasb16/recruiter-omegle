from flask import request, jsonify, render_template
from app import app, db
from app.models import User, Match
import subprocess
from flask_login import current_user

@app.route('/layout')
def home():
    return render_template('layout.html')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@app.route('/video_chat')
def video_chat():
    return render_template('video_chat.html')

@app.route('/swipe')
def swipe():
    # Ensure user context is passed
    user = current_user if current_user.is_authenticated else None
    return render_template('swipe.html', user=user)

@app.route('/map_data', methods=['GET'])
def map_data():
    return jsonify([
        {"id": 1, "name": "John Doe", "role": "jobseeker", "location": [37.7749, -122.4194]},
        {"id": 2, "name": "Jane Smith", "role": "recruiter", "location": [37.7849, -122.4094]}
    ])

