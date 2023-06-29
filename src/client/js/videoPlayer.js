const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const video = document.querySelector("video");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

// console.log(play, mute, time, volume, video);

let volumeValue = 0.5;
let controlsTimeout = null;
let controlsMovementTimeout = null;

video.volume = volumeValue;

// V main func
const handlePlay = (event) => {
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

const handleMute = (e) => {
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

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;

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

const formatTime = (second) => {
  const startIdx = second >= 3600 ? 11 : 14;
  return new Date(second * 1000).toISOString().substring(startIdx, 19);
};

const handleLodedMetadata = (event) => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUPdate = (event) => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  video.currentTime = event.target.value;
};

const handleFullScreen = () => {
  // video.requestFullscreen();
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
};

const handleFullScreenBtn = () => {
  const fullScreen = document.fullscreenElement;
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

const hidenControls = () => {
  videoControls.classList.remove("showing");
};

const handleMouseMove = (event) => {
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

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hidenControls, 2000);
};

const handleKeyDownBodyPlay = (event) => {
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
const changeInnerText = (target, condition, trueInnerText, falseInnerText) => {
  target.innerText = condition ? trueInnerText : falseInnerText;
  return target.innerText;
};

const handleEnded = (event) => {
  const id = videoContainer.dataset.videoId;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
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
