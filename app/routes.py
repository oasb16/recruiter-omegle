from flask import request, jsonify, render_template, redirect, url_for
from app import app, db
from app.models import User, Match
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
    location = "United States"         # Example location (customize as needed)
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

import requests

# Replace with your Findwork API token
FINDWORK_API_TOKEN = "4bfd1629037a2acceba43c822004814a8bee8ab2"
BASE_URL = "https://findwork.dev/api/jobs/"

@app.route('/findwork_api')
def fetch_findwork_jobs(query="", location="", sort_by="relevance", limit=10):
    """
    Fetch jobs from Findwork API based on the provided parameters.
    :param query: Search query (e.g., "Python Developer").
    :param location: Job location (optional).
    :param sort_by: Sort order ("relevance", "date").
    :param limit: Number of results to fetch.
    :return: List of job postings.
    """
    headers = {"Authorization": f"Token {FINDWORK_API_TOKEN}"}
    params = {
        "search": query,
        "location": location,
        "sort_by": sort_by,
        "limit": limit,
    }

    try:
        print("Trying to get cards")
        response = requests.get(BASE_URL, headers=headers, params=params)
        response.raise_for_status()
        print(response.json().get("results", []))
        return response.json().get("results", [])
    except requests.exceptions.RequestException as e:
        print(f"Error fetching Findwork jobs: {e}")
        return []

# Cache for Findwork API responses
findwork_cache = []

@app.route('/findwork_api_cache', methods=['GET'])
def findwork_api():
    global findwork_cache

    # Check if cache exists
    if findwork_cache:
        print("Serving data from cache.")
        return jsonify(findwork_cache)

    # Fetch data from Findwork API (replace with your real API URL and headers)
    url = "https://findwork.dev/api/jobs/"  # Replace with the actual API endpoint
    headers = {"Authorization": "Bearer YOUR_API_KEY"}  # Replace with your API key

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from Findwork API"}), 500

    jobs = response.json()["results"]  # Adjust based on API response structure
    findwork_cache = jobs[:100]  # Cache the first 100 responses

    return jsonify(findwork_cache)


