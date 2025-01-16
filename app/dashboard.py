from flask import jsonify, request, render_template
from app import app

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/scale', methods=['POST'])
def scale():
    service = request.json.get('service')
    action = request.json.get('action')
    # Simulate scaling actions (extend for actual cloud integration)
    return jsonify({'message': f'{action.capitalize()}ing {service}'})
