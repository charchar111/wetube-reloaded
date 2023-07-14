"use strict";

var playBtn = document.getElementById("play");
var playBtnIcon = playBtn.querySelector("i");
var muteBtn = document.getElementById("mute");
var muteBtnIcon = muteBtn.querySelector("i");
var time = document.getElementById("time");
var volumeRange = document.getElementById("volume");
var video = document.querySelector("video");
var currenTime = document.getElementById("currenTime");
var totalTime = document.getElementById("totalTime");
var timeline = document.getElementById("timeline");
var fullScreenBtn = document.getElementById("fullScreen");
var fullScreenBtnIcon = fullScreenBtn.querySelector("i");
var videoContainer = document.getElementById("videoContainer");
var videoControls = document.getElementById("videoControls");

// console.log(play, mute, time, volume, video);

var volumeValue = 0.5;
var controlsTimeout = null;
var controlsMovementTimeout = null;
video.volume = volumeValue;

// V main func
var handlePlay = function handlePlay(event) {
  if (video.paused) {
    video.play();
    playBtnIcon.classList.remove("fa-solid", "fa-play");
    playBtnIcon.classList.add("fa-solid", "fa-pause");
  } else {
    video.pause();
    playBtnIcon.classList.remove("fa-solid", "fa-pause");
    playBtnIcon.classList.add("fa-solid", "fa-play");
  }
  // playBtn.innerText = video.paused ? "Play" : "Pause";

  // changeInnerText(playBtn, video.paused, "Play", "Pause");
};
// const handlePause = (e) => {
//   playBtn.innerText = "Play";
// };

// const handlePlay = (e) => {
//   playBtn.innerText = "Pause";
// };

var handleMute = function handleMute(e) {
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList.remove("fa-solid", "fa-volume-xmark");
    muteBtnIcon.classList.add("fa-solid", "fa-volume-high");
    // console.dir(video.volume);
  } else {
    video.muted = true;
    // console.dir(volumeRange);
    // console.dir(video.volume);
    muteBtnIcon.classList.remove("fa-solid", "fa-volume-high");
    muteBtnIcon.classList.add("fa-solid", "fa-volume-xmark");
  }

  //   volumeRange.value = video.muted ? 0 : volumeValue;
  volumeRange.value = video.muted ? 0 : volumeValue == 0 ? 0.5 : volumeValue;
  if (volumeValue == 0) {
    video.volume = 0.5;
  }
};
var handleVolumeChange = function handleVolumeChange(event) {
  var value = event.target.value;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList.remove("fa-solid", "fa-volume-xmark");
    muteBtnIcon.classList.add("fa-solid", "fa-volume-high");
  }
  if (value == 0) {
    video.muted = true;
    muteBtnIcon.classList.remove("fa-solid", "fa-volume-high");
    muteBtnIcon.classList.add("fa-solid", "fa-volume-xmark");
  }
  volumeValue = value;
  video.volume = value;
  //   console.dir(event.target.value);
};

var formatTime = function formatTime(second) {
  var startIdx = second >= 3600 ? 11 : 14;
  return new Date(second * 1000).toISOString().substring(startIdx, 19);
};
var handleLodedMetadata = function handleLodedMetadata(event) {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
var handleTimeUPdate = function handleTimeUPdate(event) {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};
var handleTimelineChange = function handleTimelineChange(event) {
  video.currentTime = event.target.value;
};
var handleFullScreen = function handleFullScreen() {
  // video.requestFullscreen();
  var fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
};
var handleFullScreenBtn = function handleFullScreenBtn() {
  var fullScreen = document.fullscreenElement;
  console.log("handleFullScreenBtn");
  if (fullScreen) {
    // fullScreenBtn.innerText = "nomal screen";
    fullScreenBtnIcon.classList.remove("fa-solid", "fa-expand");
    fullScreenBtnIcon.classList.add("fa-solid", "fa-compress");
  } else {
    fullScreenBtnIcon.classList.remove("fa-solid", "fa-compress");
    fullScreenBtnIcon.classList.add("fa-solid", "fa-expand");

    // fullScreenBtn.innerText = "full screen";
  }
};

var hidenControls = function hidenControls() {
  videoControls.classList.remove("showing");
};
var handleMouseMove = function handleMouseMove(event) {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hidenControls, 2000);
};
var handleMouseLeave = function handleMouseLeave() {
  controlsTimeout = setTimeout(hidenControls, 2000);
};
var handleKeyDownBodyPlay = function handleKeyDownBodyPlay(event) {
  if (event.keyCode === 32 && event.target == document.body) {
    event.preventDefault();
    handlePlay();
  }
};

//
//  V sub func

/**
 * 타겟의 텍스트 값을 조건에 따라 반환
 * @param {object} target
 * @param {boolean} condition 불리안을 반환하는 구문
 * @param {any} trueInnerText true 시 입력값
 * @param {any} falseInnerText false 시 입력값
 * @returns 최종적으로 선택된 텍스트 반환
 */
var changeInnerText = function changeInnerText(target, condition, trueInnerText, falseInnerText) {
  target.innerText = condition ? trueInnerText : falseInnerText;
  return target.innerText;
};
var handleEnded = function handleEnded(event) {
  var id = videoContainer.dataset.videoId;
  fetch("/api/videos/".concat(id, "/view"), {
    method: "POST"
  });
};
playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
// video.addEventListener("pause", handlePause);
// video.addEventListener("play", handlePlay);

// volumeRange.addEventListener("change", handleVolumeChange);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLodedMetadata);
video.addEventListener("timeupdate", handleTimeUPdate);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
document.addEventListener("fullscreenchange", handleFullScreenBtn);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
// 마우스

video.addEventListener("click", handlePlay);
// 비디오 전체 박스 클릭=> 영상 정지

document.addEventListener("keydown", handleKeyDownBodyPlay);
// 비디오 전체 박스 스페이스 키다운=> 영상 정지