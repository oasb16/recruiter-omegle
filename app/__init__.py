from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)
socketio = SocketIO(app)  # Initialize SocketIO here
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Import routes and other modules after initializing the app and extensions
from app import routes, dashboard, swiping, video
from app.models import User
from app import login_manager

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))  # Fetch the user from the database
