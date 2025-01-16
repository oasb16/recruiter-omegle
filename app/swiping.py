from flask import jsonify, request
from app import app, db
from app.models import Match, User

# @app.route('/swipe_cards', methods=['GET'])
# def swipe_cards():
#     role = request.args.get('role')  # Role: jobseeker or recruiter
#     if role == "recruiter":
#         # Fetch jobseekers for recruiters to swipe on
#         cards = User.query.filter_by(role="jobseeker").all()
#     else:
#         # Fetch job postings for jobseekers to swipe on
#         cards = User.query.filter_by(role="recruiter").all()

#     # Mock response (replace with database query)
#     return jsonify([{"id": user.id, "name": user.name, "role": user.role} for user in cards])

# @app.route('/swipe_action', methods=['POST'])
# def swipe_action():
#     data = request.json
#     match = Match(
#         recruiter_id=data['recruiter_id'],
#         jobseeker_id=data['jobseeker_id'],
#         status=data['action']  # liked or disliked
#     )
#     db.session.add(match)
#     db.session.commit()
#     return jsonify({"message": "Swipe action recorded"})
