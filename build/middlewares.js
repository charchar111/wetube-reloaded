"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoUpload = exports.publicOnlyMiddleware = exports.protectorMiddleware = exports.localMiddleware = exports.avatarUpload = exports.apiProtectorMiddleware = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var localMiddleware = function localMiddleware(req, res, next) {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.siteName = "Wetube";
  next();
};
exports.localMiddleware = localMiddleware;
var protectorMiddleware = function protectorMiddleware(req, res, next) {
  console.log("protectorMiddleware");
  console.log(req.session);
  if (!req.session.loggedIn) {
    console.log("your not login :protectorMiddleware ");
    req.flash("error", "please login first");
    res.redirect("/");
  } else {
    next();
  }
};
// 로그인되어 있지 않을 시, home으로 리다이렉트
exports.protectorMiddleware = protectorMiddleware;
var publicOnlyMiddleware = function publicOnlyMiddleware(req, res, next) {
  if (req.session.loggedIn) {
    req.flash("error", "Not Authorized:publicOnlyMiddleware");
    return res.redirect("/");
  } else {
    next();
  }
};
// 로그인되어 있을 시, home으로 리다이렉트
exports.publicOnlyMiddleware = publicOnlyMiddleware;
var avatarUpload = (0, _multer["default"])({
  dest: "uploads/avatars",
  limits: {
    fileSize: 3000000
  }
});
exports.avatarUpload = avatarUpload;
var videoUpload = (0, _multer["default"])({
  dest: "uploads/videos",
  limits: {
    fileSize: 10000000
  }
});

// api용 로그인 확인 미들웨어, 로그인 x => home으로 리다이렉트 요청함
exports.videoUpload = videoUpload;
var apiProtectorMiddleware = function apiProtectorMiddleware(req, res, next) {
  if (!req.session.loggedIn) {
    console.log("your not login :apiProtectorMiddleware ");
    req.flash("error", "please login first");
    return res.sendStatus(303);
  } else {
    next();
  }
};
exports.apiProtectorMiddleware = apiProtectorMiddleware;