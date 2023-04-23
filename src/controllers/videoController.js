import { render } from "pug";
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
    const videos = await Video.find({});
    console.log(videos);
    return res.render("home", { pageTitle: "home", videos });
  } catch (error) {
    console.log("server error: ", error);
    return res.render("serverError");
  }
};

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
  const { title, description, hashtags } = req.body;
  let hashtag = hashtags.split(",");
  hashtag = hashtag.map((word) => `#${word}`);
  console.log(title, description, hashtags);
  console.log(hashtag);
  const video = new Video({
    title,
    //위 동일, title: title/
    description,
    createAt: Date.now,
    hashtags: hashtag,
    meta: {
      views: 0,
      rating: 0,
    },
  });
  // console.dir(videos);
  console.log(video);
  return res.redirect("/");
};
