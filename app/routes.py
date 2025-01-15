from flask import render_template, request, redirect, url_for
from app import app, db
from app.models import User

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Handle form submissions (e.g., user profile creation)
    pass
