const fakeUser = {
  username: "charchar",
  loggedIn: false,
};

export const trending = (req, res) => {
  const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return res.render("home", { pageTitle: "home", fakeUser: fakeUser, videos });
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
