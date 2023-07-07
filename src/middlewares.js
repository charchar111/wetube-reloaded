import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.siteName = "Wetube";

  next();
};

export const protectorMiddleware = (req, res, next) => {
  console.log("protectorMiddleware");
  console.log(req.session);
  if (!req.session.loggedIn) {
    console.log("your not login :protectorMiddleware ");
    req.flash("error", "Not Authorized:protectorMiddleware");
    res.redirect("/");
  } else {
    next();
  }
};
// 로그인되어 있지 않을 시, home으로 리다이렉트

export const publicOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    req.flash("error", "Not Authorized:publicOnlyMiddleware");
    return res.redirect("/");
  } else {
    next();
  }
};
// 로그인되어 있을 시, home으로 리다이렉트

export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 3000000 },
});
export const videoUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 10000000 },
});
