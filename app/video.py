from flask_socketio import emit, join_room, leave_room
from app import socketio

@socketio.on('join_room')
def join_room_event(data):
    room = data.get('room')
    join_room(room)
    emit('joined', {'room': room}, room=room)

@socketio.on('offer')
def offer_event(data):
    emit('offer', data, room=data['room'])

@socketio.on('answer')
def answer_event(data):
    emit('answer', data, room=data['room'])

@socketio.on('candidate')
def candidate_event(data):
    emit('candidate', data, room=data['room'])
