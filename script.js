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
    var currip1 = (videoImages[i].id == "browser_video1") ? ip1 : ip2;
    videoImages[i].src = "http://" + currip1 + ":8080/video";
    videoImages[i].onerror = function () {
      this.style.display = "none"; // Hide the image on error
      console.log(videoImages[i], "hidden");
    };
    videoImages[i].onload = function () {
      this.style.display = "block"; // Show the image when successfully loaded
      console.log(videoImages[i], "opened");
    };
  }

  var videoImagesIos = document.getElementsByClassName("video-image-ios");
  for (var i = 0; i < videoImagesIos.length; i++) {
    var currip2 = (videoImagesIos[i].id == "browser_video2") ? ip1 : ip2;
    videoImagesIos[i].src = "http://" + currip2 + ":80/video.mjpg";
    videoImagesIos[i].onerror = function () {
      this.style.display = "none"; // Hide the image on error
      console.log(videoImages[i], "hidden");
    };
    videoImagesIos[i].onload = function () {
      this.style.display = "block"; // Show the image when successfully loaded
      console.log(videoImages[i], "opened");
    };
  }
}
