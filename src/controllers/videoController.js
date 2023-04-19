export const trending = (req, res) => {
  const videos = [
    {
      title: "first",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
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

  return res.render("home", { pageTitle: "home", videos });
};
export const see = (req, res) => {
  return res.render("watch", { videoIndex: req.params.id });
};
export const edit = (req, res) => res.render("edit");

export const search = (req, res) => res.send("search");
export const deleteVideo = (req, res) => {
  res.send("delete video");
};

export const upload = (req, res) => res.send("upload video");
