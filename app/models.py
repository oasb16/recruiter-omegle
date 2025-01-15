from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    resume = db.Column(db.Text)
    location = db.Column(db.String(100))
    industry = db.Column(db.String(50))
