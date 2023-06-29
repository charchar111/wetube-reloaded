const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;

const handleStop = () => {
  console.log("stop");
  startBtn.innerText = "start recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);

  recorder.stop();
};
const handleStart = () => {
  console.log("record ");
  startBtn.innerText = "stop recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  console.log(recorder);
  recorder.ondataavailable = (event) => {
    console.log("recording done");
    console.log(event);
    const videoFile = URL.createObjectURL(event.data);
    console.log(videoFile);
    console.log(typeof videoFile);
  };
  recorder.start();
  console.log(recorder);
};

const init = async (event) => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  console.log("video");
  console.dir(video);
  console.log(stream);

  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
