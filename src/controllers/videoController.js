export const trending = (req, res) => res.send("this is homepage");
export const see = (req, res) => {
  //   console.log(typeof Object.values(req.params)[0]);
  console.log(req.params);
  return res.send(`watch videos #${req.params.id}`);
};
export const edit = (req, res) => {
  res.send("video edit");
};

export const search = (req, res) => res.send("search");
export const deleteVideo = (req, res) => {
  res.send("delete video");
};

export const upload = (req, res) => res.send("upload video");
