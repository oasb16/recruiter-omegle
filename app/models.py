from app import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(20))  # "jobseeker" or "recruiter"
    password = db.Column(db.String(128))

    def __repr__(self):
        return f"<User {self.name}>"

class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recruiter_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    jobseeker_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    status = db.Column(db.String(20))  # "liked", "disliked", "matched"



