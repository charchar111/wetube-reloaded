import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const anchor = document.createElement("a");
  anchor.href = fileUrl;
  anchor.download = fileName;
  // document.body.appendChild(a);
  anchor.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;
  console.dir(actionBtn);

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );
  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbFile = ffmpeg.FS("readFile", files.thumb);
  //   console.log(mp4File);
  //   //uni 뭐시기 생성
  //   console.log(mp4File.buffer);
  // //arraybuffer, 실제파일 접근 생성

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);
  console.log(thumbUrl);

  // const mp4A = document.createElement("a");
  // mp4A.href = mp4Url;
  // mp4A.download = "my recording.mp4";
  // // document.body.appendChild(a);
  // mp4A.click();

  // const thumbA = document.createElement("a");
  // thumbA.href = thumbUrl;
  // thumbA.download = files.thumb;
  // // document.body.appendChild(a);
  // thumbA.click();

  downloadFile(mp4Url, files.output);
  downloadFile(thumbUrl, files.thumb);

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);

  URL.revokeObjectURL(videoFile);

  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
  stream = null;

  actionBtn.disabled = false;
  actionBtn.innerText = "record again";
  actionBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
  console.log("stop");
  // actionBtn.innerText = "start recording";
  actionBtn.innerText = "download recording";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);

  recorder.stop();
};

const init = async (event) => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: 1024,
      height: 576,
    },
  });
  console.log("video");
  console.dir(video);
  console.log(stream);

  video.srcObject = stream;
  video.play();
};

const handleStart = async () => {
  console.log("record ");
  actionBtn.innerText = "stop recording";
  await init();
  console.log("stream");
  console.log(stream);
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleStop);
  // recorder = new MediaRecorder(stream, { mimeType: "video/mp4" });
  recorder = new MediaRecorder(stream);
  console.log(recorder);
  recorder.ondataavailable = (event) => {
    console.log("recording done");
    console.log(event);
    videoFile = URL.createObjectURL(event.data);
    console.log(videoFile);
    console.log(typeof videoFile);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
  console.log(recorder);
};

actionBtn.addEventListener("click", handleStart);
