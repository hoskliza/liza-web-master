let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

var myVideo = document.getElementById('video1');

function playPause() {
  if (myVideo.paused) myVideo.play();
  else myVideo.pause();
}

function makeBig() {
  if (myVideo) {
    myVideo.width = 560;
  } else {
    console.log('no video for you');
  }
}

function makeSmall() {
  myVideo.width = 320;
}

function makeNormal() {
  myVideo.width = 420;
}

$(document).ready(function ($) {
  $('#chatClick').click(function () {
    window.location.href = '/chat';
  });
});
