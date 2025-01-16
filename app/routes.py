from flask import request, jsonify, render_template, redirect, url_for
from app import app, db
from app.models import User, Match
from app.findwork_api import fetch_findwork_jobs
import subprocess, json
from flask_login import current_user


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

@app.route('/swipe', methods=['GET', 'POST'])
def swipe():
    if request.method == 'POST':
        role = request.form.get('role')
        return redirect(url_for('swipe_cards', role=role))
    return render_template('swipe.html')

@app.route('/swipe_cards', methods=['GET'])
def swipe_cards():
    role = request.args.get('role', 'jobseeker')  # Default to jobseeker
    query = "Python Developer"  # Example query (customize as needed)
    location = "Remote"         # Example location (customize as needed)
    limit = 10                  # Number of jobs to fetch

    if role == "recruiter":
        # Fetch jobseekers (dummy data or actual integration as per earlier logic)
        return jsonify([
            {"id": 1, "name": "Alice", "skills": ["Python", "Flask"]},
            {"id": 2, "name": "Bob", "skills": ["React", "Node.js"]},
        ])
    elif role == "jobseeker":
        # Fetch real-time jobs from Findwork API
        findwork_jobs = fetch_findwork_jobs(query=query, location=location, limit=limit)

        # Include all required details in the response
        jobs = [
            {
                "id": job["id"],
                "role": job.get("role", "N/A"),
                "company_name": job.get("company_name", "N/A"),
                "company_num_employees": job.get("company_num_employees", "N/A"),
                "employment_type": job.get("employment_type", "N/A"),
                "location": job.get("location", "N/A"),
                "remote": job.get("remote", False),
                "logo": job.get("logo"),
                "url": job.get("url"),
                "description": job.get("text", "N/A"),
                "date_posted": job.get("date_posted", "N/A"),
                "keywords": job.get("keywords", []),
                "source": job.get("source", "N/A"),
            }
            for job in findwork_jobs
        ]
        return jsonify(jobs)

    return jsonify({"error": "Invalid role"}), 400


@app.route('/map_data', methods=['GET'])
def map_data():
    return jsonify([
        {"id": 1, "name": "John Doe", "role": "jobseeker", "location": [37.7749, -122.4194]},
        {"id": 2, "name": "Jane Smith", "role": "recruiter", "location": [37.7849, -122.4094]}
    ])
