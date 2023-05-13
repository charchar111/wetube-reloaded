import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    console.log(videos);
    return res.render("home", { pageTitle: "home", videos });
  } catch (error) {
    console.log("server error: ", error);
    return res.status(404).render("serverError", { pageTitle: "error" });
  }
};

export const watch = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (video) {
      return res.render("watch", {
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
  } else {
    return res.render("edit", { pageTitle: `Editing:${video.title}`, video });
  }
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

    const video = await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    console.log(video);

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
    });
    console.log(videos);
  }

  res.render("search", { pageTitle: "search", videos });
};
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const deleteVideo = await Video.findByIdAndDelete(id);
  console.log("delete:" + deleteVideo);

  res.redirect("/");
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "upload" });

export const postUpload = async (req, res) => {
  // here we will add a video to the video array
  const { title, description, hashtags } = req.body;
  // hashtag = hashtags.split(",").map((word) => `#${word.trim()}`);

  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      // hashtags: hashtags.split(",").map((word) => `#${word.trim()}`),
    });

    return res.redirect("/");
  } catch (error) {
    res
      .status(400)
      .render("upload", { pageTitle: "upload", errorMessage: error });
  }
};
