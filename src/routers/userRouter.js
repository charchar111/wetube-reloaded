import express from "express";
import {
  remove,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  startKakaoLogin,
  processOneKakaoLogin,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";

import {
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);

userRouter
  .route("/edit-profile")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);

userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/remove", remove);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/kakaotalk/start", startKakaoLogin);
userRouter.get("/kakaotalk/process-one", processOneKakaoLogin);
userRouter.get("/:id", see);

export default userRouter;
