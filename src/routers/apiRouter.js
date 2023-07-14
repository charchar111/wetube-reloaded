import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
  editComment,
  likeComment,
  replyComment,
  replyViewComment,
} from "../controllers/videoController";

import { apiProtectorMiddleware, protectorMiddleware } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);

// 댓글 삭제, 중간은 코멘트 아이디
apiRouter.delete(
  "/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})/delete",
  deleteComment
);

apiRouter.post(
  "/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})/edit",
  editComment
);

//  좋아요 요청
apiRouter.post(
  "/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})/like",
  apiProtectorMiddleware,
  likeComment
);

apiRouter.post(
  "/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})/reply",
  replyComment
);

apiRouter.post(
  "/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})/reply/view",
  replyViewComment
);

export default apiRouter;
