const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startVideoButton = document.getElementById('startVideo');
const sendMessageButton = document.getElementById('sendMessage');
const chatBox = document.getElementById('chat-box');

let localStream;
let peerConnection;

// Configure STUN server (free service by Google)
const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

startVideoButton.addEventListener('click', async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;

  peerConnection = new RTCPeerConnection(configuration);
  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  peerConnection.ontrack = event => {
    remoteVideo.srcObject = event.streams[0];
  };

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      // Send candidate to remote peer
    }
  };

  // Send offer to remote peer
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  // Send offer to remote peer
});
