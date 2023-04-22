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

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
