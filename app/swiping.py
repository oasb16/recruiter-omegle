from flask import jsonify, request
from app import app, db
from app.models import User

@app.route('/swipe_cards', methods=['GET'])
def swipe_cards():
    role = request.args.get('role')  # Expected values: "jobseeker" or "recruiter"
    
    # Fetch data based on role
    if role == "recruiter":
        cards = User.query.filter_by(role="jobseeker").all()  # Fetch jobseekers
    elif role == "jobseeker":
        cards = User.query.filter_by(role="recruiter").all()  # Fetch job postings
    else:
        return jsonify({"error": "Invalid role"}), 400

    # Return serialized data
    return jsonify([{"id": user.id, "name": user.name, "role": user.role} for user in cards])
