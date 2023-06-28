import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ createdAt: "desc" })
      .populate("owner");

    return res.render("video/home", { pageTitle: "home", videos });
  } catch (error) {
    console.log("server error: ", error);
    return res.status(404).render("serverError", { pageTitle: "error" });
  }
};

export const watch = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id).populate("owner");

    if (video) {
      return res.render("video/watch", {
        pageTitle: ` ${video.title}`,
        video,
      });
    } else {
      return res.status(404).render("serverError"), { pageTitle: "error" };
    }

    // res.send("hello");
  } catch (error) {
    console.log(error);
    return res.status(400).render("serverError"), { pageTitle: "error" };
  }
};
export const getEdit = async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);
  console.log(video);
  if (!video) {
    return res.status(400).render("serverError"), { pageTitle: "error" };
  }
  if (String(video.owner) !== String(req.session.user._id)) {
    console.log("비정상적 접근 시도");
    return res.redirect("/");
  }
  return res.render("video/edit", {
    pageTitle: `Editing:${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;

  const videoCheck = await Video.exists({ _id: id });
  console.log(videoCheck);
  // 비디오존재 확인용
  if (!videoCheck) {
    return res.status(404).render("serverError"), { pageTitle: "error" };
  } else {
    // video.title = title;
    // video.description = description;

    // video.hashtags = hashtags
    //   .split(",")
    //   .map((word) => (word.startsWith("#") ? word : `#${word}`));

    const video = await Video.findByIdAndUpdate(
      id,
      {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
      },
      { new: true }
    );

    if (String(video.owner) !== String(req.session.user._id)) {
      console.log("비정상적 접근 시도");
      return res.redirect("/");
    }
    res.redirect(`/videos/${id}`);
  }
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "gim"),
        // $regex: new RegExp(`^${keyword}`, "gim"),
      },
    }).populate("owner");
    console.log(videos);
  }

  res.render("video/search", { pageTitle: "search", videos });
};
export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  // console.log(id);
  // const video = await Video.findById(id);
  let video;
  try {
    video = await Video.findById(id);
  } catch (error) {
    console.log("server error: ", error);
    return res.status(404).render("serverError", { pageTitle: "error" });
  }

  if (!video) {
    console.log("server error: ", error);
    return res.status(404).render("serverError", { pageTitle: "error" });
  }
  if (String(video.owner) !== String(req.session.user._id)) {
    console.log("비정상적 접근 시도");
    return res.redirect("/");
  }
  const deleteVideo = await Video.findByIdAndDelete(id);
  const user = await User.findById(deleteVideo.owner);
  if (!user) {
    res.redirect("/");
  }
  // console.log("delete:" + deleteVideo);
  console.log(user);
  user.videos.splice(user.videos.indexOf(deleteVideo._id), 1);
  user.save();
  res.redirect("/");
};

export const getUpload = (req, res) => {
  return res.render("video/upload", { pageTitle: "upload" });
};

export const postUpload = async (req, res) => {
  // here we will add a video to the video array
  const { path: fileUrl } = req.file;

  const { title, description, hashtags } = req.body;
  const {
    user: { _id },
  } = req.session;
  // hashtag = hashtags.split(",").map((word) => `#${word.trim()}`);
  console.log(_id);
  try {
    console.log("비디오 파일 생성 시작");
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
      // hashtags: hashtags.split(",").map((word) => `#${word.trim()}`),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch (error) {
    res
      .status(400)
      .render("video/upload", { pageTitle: "upload", errorMessage: error });
  }
};
