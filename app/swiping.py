from flask import jsonify, request
from app import app, db
from app.models import User, Match

# Dummy data
dummy_jobseekers = [
    {"id": 1, "name": "Alice", "role": "jobseeker", "skills": ["Python", "Flask"]},
    {"id": 2, "name": "Bob", "role": "jobseeker", "skills": ["React", "Node.js"]},
    {"id": 3, "name": "Carol", "role": "jobseeker", "skills": ["AWS", "DevOps"]},
]

dummy_jobs = [
    {"id": 4, "title": "Backend Developer", "role": "recruiter", "description": "Python, Flask"},
    {"id": 5, "title": "Frontend Developer", "role": "recruiter", "description": "React, Node.js"},
    {"id": 6, "title": "DevOps Engineer", "role": "recruiter", "description": "AWS, CI/CD"},
]

@app.route('/record_swipe', methods=['POST'])
def record_swipe():
    data = request.json
    print(f"Swipe recorded: {data}")  # Replace with database logic if required
    return jsonify({"status": "success"}), 200

@app.route('/api/swipe_cards', methods=['GET'])
def api_swipe_cards():
    role = request.args.get('role')
    if role == "recruiter":
        return jsonify(dummy_jobseekers)
    elif role == "jobseeker":
        return jsonify(dummy_jobs)
    return jsonify({"error": "Invalid role"}), 400


