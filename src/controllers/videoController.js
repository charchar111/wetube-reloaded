let videos = [
  {
    title: "first",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "second",
    rating: 8,
    comments: 5,
    createdAt: "2 minutes ago",
    views: 959,
    id: 2,
  },
  {
    title: "third",
    rating: 7,
    comments: 10,
    createdAt: "2 minutes ago",
    views: 519,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "home", videos });
};
export const watch = (req, res) => {
  // const id = req.params.id 아래와 동일, es6 문법;
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", {
    pageTitle: `watch ${video.title}`,
    videoIndex: id,
    video,
  });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;

  console.log(req.body);
  const { title } = req.body;
  videos[id - 1].title = title;
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

  const newVideo = {
    title,
    // title = req.body.title
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  console.dir(videos);

  return res.redirect("/");
};
