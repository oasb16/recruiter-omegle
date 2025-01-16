from flask_socketio import emit, join_room, leave_room
from app import socketio

@socketio.on('join_room')
def handle_join_room(data):
    room = data.get('room')
    join_room(room)
    emit('joined_room', {'room': room}, room=room)

@socketio.on('offer')
def handle_offer(data):
    room = data.get('room')
    offer = data.get('offer')
    emit('offer', {'offer': offer}, room=room)

@socketio.on('answer')
def handle_answer(data):
    room = data.get('room')
    answer = data.get('answer')
    emit('answer', {'answer': answer}, room=room)

@socketio.on('candidate')
def handle_candidate(data):
    room = data.get('room')
    candidate = data.get('candidate')
    emit('candidate', {'candidate': candidate}, room=room)
