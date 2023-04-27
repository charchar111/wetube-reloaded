import express from "express";
import {
  watch,
  getEdit,
  getUpload,
  postUpload,
  deleteVideo,
  postEdit,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);
// 위, 고침, 문자열 포함 id 검색 목적/
// videoRouter.get("/:id(\\d+)", watch);
// videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

// videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
