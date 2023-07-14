"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _videoController = require("../controllers/videoController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var apiRouter = _express["default"].Router();
apiRouter.post("/videos/:id([0-9a-f]{24})/view", _videoController.registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", _videoController.createComment);

// 댓글 삭제, 중간은 코멘트 아이디
apiRouter["delete"]("/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})/delete", _videoController.deleteComment);
apiRouter.post("/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})/edit", _videoController.editComment);

//  좋아요 요청
apiRouter.post("/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})/like", _middlewares.apiProtectorMiddleware, _videoController.likeComment);
apiRouter.post("/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})/reply", _videoController.replyComment);
apiRouter.post("/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})/reply/view", _videoController.replyViewComment);
var _default = apiRouter;
exports["default"] = _default;