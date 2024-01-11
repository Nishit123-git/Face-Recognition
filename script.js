'use strict';
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const uploadInput = document.getElementById('upload');

const constraints = {
  audio: false,
  video: {
    width: 1000,
    height: 720
  }
};

async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    console.error(`navigator.getUserMedia error: ${e.toString()}`);
  }
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
init();

// Draw Image
const context = canvas.getContext('2d');
snap.addEventListener("click", function () {
  context.drawImage(video, 0, 0, 640, 480);
});

// Handle image upload
function handleUpload() {
  const selectedFile = uploadInput.files[0];
  if (selectedFile) {
    const img = new Image();
    img.onload = function () {
      context.drawImage(img, 0, 0, 640, 480);
    };
    img.src = URL.createObjectURL(selectedFile);
  }
}
