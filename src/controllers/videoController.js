import Video from "../models/Video";

// Video.find({}, (error, videos) => {
//   // console.log("search start");
//   // console.log("error: ", error);
//   // console.log("videos", videos);
//   // console.log("search end");
// });

// export const home = (req, res) => {
//   return res.render("home", { pageTitle: "home", videos: [] });
// };
//위 콜백 방식 고친거/

// export const home = (req, res) => {
//   console.log("search start");
//   Video.find({}, (error, videos) => {
//     // console.log("error: ", error);
//     // console.log("videos", videos);
//     console.log("search end");
//     console.log(videos);
//   });
//   return res.render("home", { pageTitle: "home", videos: [] });
// };
//위, 비동기화 콜백 안고친거/

export const home = async (req, res) => {
  try {
    console.log("i start");
    const videos = await Video.find({});
    console.log("i finished");
    console.log(videos);
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log("server error:", error);
    return res.render("serverError");
  }
};
//동기적, try= 정상 실행, catch = 에러 발생 시/;

export const watch = (req, res) => {
  const { id } = req.params;

  return res.render("watch", {
    pageTitle: `watch ${video.title}`,
  });
};
export const getEdit = (req, res) => {
  const { id } = req.params;

  return res.render("edit", { pageTitle: `Editing:}` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;

  console.log(req.body);
  const { title } = req.body;

  res.redirect(`/videos/${id}`);
};

export const search = (req, res) => res.send("search");
export const deleteVideo = (req, res) => {
  res.send("delete video");
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "upload" });
export const postUpload = (req, res) => {
  // here we will add a video to the video array
  const { title } = req.body;

  // console.dir(videos);

  return res.redirect("/");
};
