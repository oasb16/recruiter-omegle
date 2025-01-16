from flask import request, jsonify, render_template
from app import app, db
from app.models import User, Match
import subprocess

@app.route('/')
def home():
    return render_template('layout.html')

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
    return render_template('swipe.html')

@app.route('/map_data', methods=['GET'])
def map_data():
    # Mock nearby user/recruiter data
    return jsonify([
        {"id": 1, "name": "John Doe", "role": "jobseeker", "location": [37.7749, -122.4194]},
        {"id": 2, "name": "Jane Smith", "role": "recruiter", "location": [37.7849, -122.4094]}
    ])

@app.route('/swipe_cards', methods=['GET'])
def swipe_cards():
    # Mock swipe cards
    return jsonify([
        {"id": 1, "name": "Jobseeker A", "role": "jobseeker", "skills": ["Python", "SQL"]},
        {"id": 2, "name": "Job Posting B", "role": "recruiter", "description": "Hiring Backend Developer"}
    ])

@app.route('/deploy', methods=['POST'])
def deploy():
    try:
        subprocess.call(['/home/omkarsbdev/RecruiterOmegle/recruiter-omegle/deploy.sh'])
        return 'Deployed Successfully', 200
    except Exception as e:
        return f'Error: {e}', 500
