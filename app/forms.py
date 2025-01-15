from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length

class JobSeekerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    resume = TextAreaField('Resume', validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    industry = SelectField(
        'Industry',
        choices=[('tech', 'Tech'), ('finance', 'Finance'), ('healthcare', 'Healthcare')],
        validators=[DataRequired()],
    )
    submit = SubmitField('Submit')
