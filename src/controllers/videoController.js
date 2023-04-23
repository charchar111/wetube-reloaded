import Video from "../models/Video";

Video.find({}, (error, videos) => {
  // console.log("search start");
  // console.log("error: ", error);
  // console.log("videos", videos);
  // console.log("search end");
});

// export const home = (req, res) => {
//   return res.render("home", { pageTitle: "home", videos: [] });
// };
//위 콜백 방식 /

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
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
  const { title } = req.body;

  // console.dir(videos);

  return res.redirect("/");
};
