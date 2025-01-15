const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallButton = document.getElementById('startCall');
const endCallButton = document.getElementById('endCall');

let localStream;
let peerConnection;

// STUN server configuration
const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

startCallButton.addEventListener('click', async () => {
    startCallButton.disabled = true;
    endCallButton.disabled = false;

    // Get local media stream
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    // Initialize peer connection
    peerConnection = new RTCPeerConnection(configuration);

    // Add tracks from local stream to the peer connection
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // Handle remote stream
    peerConnection.ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };

    // Handle ICE candidates
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            // Send candidate to the server (placeholder)
            console.log('New ICE candidate:', event.candidate);
        }
    };

    // Create and send offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('Offer created:', offer);
    // Send offer to the server (placeholder)
});

endCallButton.addEventListener('click', () => {
    endCallButton.disabled = true;
    startCallButton.disabled = false;

    // Close peer connection and stop streams
    peerConnection.close();
    localStream.getTracks().forEach(track => track.stop());

    // Reset UI
    remoteVideo.srcObject = null;
    localVideo.srcObject = null;
});
