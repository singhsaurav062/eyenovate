// Default IP address
var defaultIp = "192.168.20.141";

// Function to change IP addresses
function changeIP() {
  // Use textboxes to get the first and second IP addresses
  var ip1 = document.getElementById("changeIP1").value || defaultIp;
  var ip2 = document.getElementById("changeIP2").value || defaultIp;

  // Update video sources based on class
  var videoImages = document.getElementsByClassName("video-image");
  for (var i = 0; i < videoImages.length; i++) {
    var currip1 = videoImages[i].id == "browser_video1" ? ip1 : ip2;
    videoImages[i].src = "https://" + currip1 + ":8080/video";
    videoImages[i].onerror = function () {
      this.style.display = "none"; // Hide the image on error
      console.log(this, "hidden");
    };
    videoImages[i].onload = function () {
      this.style.display = "block"; // Show the image when successfully loaded
      console.log(this, "opened");
    };
  }

  var videoImagesIos = document.getElementsByClassName("video-image-ios");
  for (var i = 0; i < videoImagesIos.length; i++) {
    var currip2 = videoImagesIos[i].id == "browser_video2" ? ip1 : ip2;
    videoImagesIos[i].src = "https://" + currip2 + ":80/video.mjpg";
    videoImagesIos[i].onerror = function () {
      this.style.display = "none"; // Hide the image on error
      console.log(this, "hidden");
    };
    videoImagesIos[i].onload = function () {
      this.style.display = "block"; // Show the image when successfully loaded
      console.log(this, "opened");
    };
  }
}

let mediaRecorder;
let recordedChunks = [];

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

startBtn.addEventListener("click", startRecording);
stopBtn.addEventListener("click", stopRecording);

async function startRecording() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" },
  });

  // Modify the URL to use HTTPS
  const streamURL = stream.getTracks()[0].getSettings().video;
  const secureStreamURL = streamURL.replace("http://", "https://");

  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "screen-recording.mp4";
    document.body.appendChild(a);
    a.click();
    recordedChunks = [];
    document.body.removeChild(a);
  };

  startBtn.disabled = true;
  stopBtn.disabled = false;

  // Use the secureStreamURL for recording
  mediaRecorder.start();
}

function stopRecording() {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
