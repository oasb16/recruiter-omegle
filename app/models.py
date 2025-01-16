from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    role = db.Column(db.String(20))  # "jobseeker" or "recruiter"
    location = db.Column(db.String(100))
    profile_data = db.Column(db.JSON)

    def __repr__(self):
        return f'<User {self.name}>'


class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recruiter_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    jobseeker_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    status = db.Column(db.String(20))  # "liked", "disliked", "matched"
    recruiter = db.relationship('User', foreign_keys=[recruiter_id], backref='recruiter_matches')
    jobseeker = db.relationship('User', foreign_keys=[jobseeker_id], backref='jobseeker_matches')

    def __repr__(self):
        return f'<Match recruiter_id={self.recruiter_id} jobseeker_id={self.jobseeker_id} status={self.status}>'
