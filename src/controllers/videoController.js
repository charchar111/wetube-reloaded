import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/comment";
import { async } from "regenerator-runtime";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ createdAt: "desc" })
      .populate("owner");

    return res.render("video/home", { pageTitle: "home", videos });
  } catch (error) {
    console.log("server error: ", error);
    return res.status(404).render("serverError", { pageTitle: "error" });
  }
};

export const watch = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id)
      .populate("owner")
      .populate("comments");

    if (video) {
      console.log(res.locals.loggedInUser._id);
      console.log(typeof res.locals.loggedInUser._id);

      console.log(video.owner._id);
      console.log(typeof video.owner._id.toString());
      return res.render("video/watch", {
        pageTitle: ` ${video.title}`,
        video,
      });
    } else {
      return res.status(404).render("serverError"), { pageTitle: "error" };
    }

    // res.send("hello");
  } catch (error) {
    console.log(error);
    return res.status(400).render("serverError"), { pageTitle: "error" };
  }
};
export const getEdit = async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);
  console.log(video);
  if (!video) {
    return res.status(400).render("serverError"), { pageTitle: "error" };
  }
  if (String(video.owner) !== String(req.session.user._id)) {
    console.log("비정상적 접근 시도");
    return res.redirect("/");
  }
  return res.render("video/edit", {
    pageTitle: `Editing:${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;

  const videoCheck = await Video.exists({ _id: id });
  console.log(videoCheck);
  // 비디오존재 확인용
  if (!videoCheck) {
    return res.status(404).render("serverError"), { pageTitle: "error" };
  } else {
    // video.title = title;
    // video.description = description;

    // video.hashtags = hashtags
    //   .split(",")
    //   .map((word) => (word.startsWith("#") ? word : `#${word}`));

    const video = await Video.findByIdAndUpdate(
      id,
      {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
      },
      { new: true }
    );

    if (String(video.owner) !== String(req.session.user._id)) {
      console.log("비정상적 접근 시도");
      return res.redirect("/");
    }
    req.flash("success", "video edit success!");
    res.redirect(`/videos/${id}`);
  }
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "gim"),
        // $regex: new RegExp(`^${keyword}`, "gim"),
      },
    }).populate("owner");
    console.log(videos);
  }

  res.render("video/search", { pageTitle: "search", videos });
};
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const error = "비정상적 삭제 권한 접근 시도";
  // console.log(id);
  // const video = await Video.findById(id);
  let video;
  try {
    video = await Video.findById(id);
  } catch (error) {
    console.log("server error: ", error);
    return res.status(404).render("serverError", { pageTitle: "error" });
  }

  if (!video) {
    console.log("server error: ", error);
    return res.status(404).render("serverError", { pageTitle: "error" });
  }
  if (!req.session.user) {
    console.log("server error: ", error);
    return res.status(404).render("serverError", { pageTitle: "error" });
  }
  if (String(video.owner) !== String(req.session.user._id)) {
    req.flash("error", "you are not the owner of the video");
    console.log("비정상적 접근 시도");
    return res.redirect("/");
  }
  const deleteVideo = await Video.findByIdAndDelete(id);
  const user = await User.findById(deleteVideo.owner);
  if (!user) {
    res.redirect("/");
  }
  // console.log("delete:" + deleteVideo);
  console.log(user);
  user.videos.splice(user.videos.indexOf(deleteVideo._id), 1);
  user.save();
  res.redirect("/");
};

export const getUpload = (req, res) => {
  return res.render("video/upload", { pageTitle: "upload" });
};

export const postUpload = async (req, res) => {
  // here we will add a video to the video array
  console.log(req.files);
  const { video, thumb } = req.files;

  const { title, description, hashtags } = req.body;
  const {
    user: { _id },
  } = req.session;
  // hashtag = hashtags.split(",").map((word) => `#${word.trim()}`);
  console.log(_id);
  try {
    console.log("비디오 파일 생성 시작");
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
      // hashtags: hashtags.split(",").map((word) => `#${word.trim()}`),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch (error) {
    res
      .status(400)
      .render("video/upload", { pageTitle: "upload", errorMessage: error });
  }
};

// api
export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views += 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user: sessionUser },
    params: { id },
    body: { text },
  } = req;

  try {
    const user = await User.findById(sessionUser._id);

    const video = await Video.findById(id);

    if (!video) {
      return res.sendStatus(404);
    }
    const comment = await Comment.create({
      text,
      video: id,
      owner: sessionUser._id,
      // meta, createdAt => default 값 입력
      // reply는 지금x
    });

    video.comments.unshift(comment._id);
    await video.save();

    user.comments.unshift(comment._id);
    await user.save();

    // return res.sendStatus(201);
    return res.status(201).json({ newCommentId: comment._id });
  } catch (error) {
    return res.sendStatus(404);
  }
};

export const deleteComment = async (req, res) => {
  console.log("delete comment");
  const { videoId } = req.params;
  const { commentId } = req.params;

  try {
    // 유효성 검사

    const video = await Video.findById(videoId);
    if (!video) {
      return res.sendStatus(404);
    }
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.sendStatus(404);
    }
    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      return res.sendStatus(404);
    }

    if (comment.owner.toString() !== req.session.user._id) {
      console.log("아이디 불일치, 삭제 거부");
      return res.sendStatus(400);
    }
    // 모델 쿼리
    await Comment.findByIdAndDelete(commentId);

    // user 도큐먼트에서 comment id 삭제
    user.comments = user.comments.filter((id) => id.toString() !== commentId);
    user.save();

    // user 도큐먼트에서 comment id 삭제
    video.comments = video.comments.filter((id) => id.toString() !== commentId);
    video.save();

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const editComment = async (req, res) => {
  console.log("editComment");
  const { videoId, commentId } = req.params;
  const { text } = req.body;

  try {
    // 유효성 검사

    const video = await Video.findById(videoId);
    if (!video) {
      return res.sendStatus(404);
    }
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.sendStatus(404);
    }
    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      return res.sendStatus(404);
    }

    if (comment.owner.toString() !== req.session.user._id) {
      console.log("아이디 불일치, 삭제 거부");
      return res.sendStatus(400);
    }
    // 모델 쿼리
    await Comment.findByIdAndUpdate(commentId, { text });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const likeComment = async (req, res) => {
  console.log("likeComment");
  const { videoId, commentId } = req.params;
  console.log(req.session.user._id);
  try {
    // 유효성 검사
    const video = await Video.findById(videoId);
    if (!video) {
      return res.sendStatus(404);
    }
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.sendStatus(404);
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.sendStatus(404);
    }

    // 모델 쿼리
    if (comment.meta.like.users.includes(req.session.user._id)) {
      console.log("좋아요 제거");
      comment.meta.like.count -= 1;
      comment.meta.like.users = comment.meta.like.users.filter(
        (id) => id.toString() !== req.session.user._id
      );
      comment.save();

      return res
        .status(200)
        .json({ count: comment.meta.like.count, user: "remove" });
    } else {
      console.log("좋아요 추가");
      comment.meta.like.count += 1;
      comment.meta.like.users.push(req.session.user._id);
      comment.save();

      return res
        .status(200)
        .json({ count: comment.meta.like.count, user: "add" });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const replyComment = async (req, res) => {
  console.log("replyComment");
  const { videoId, commentId } = req.params;
  const { text } = req.body;
  console.log("text");
  console.log(text);
  try {
    // 유효성 검사

    const video = await Video.findById(videoId);
    if (!video) {
      return res.sendStatus(404);
    }
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.sendStatus(404);
    }
    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      return res.sendStatus(404);
    }

    if (comment.owner.toString() !== req.session.user._id) {
      console.log("아이디 불일치, 삭제 거부");
      return res.sendStatus(400);
    }
    // 모델 쿼리
    const reply = await Comment.create({
      text,
      video: videoId,
      owner: req.session.user._id,
      reply: { class: 1, group: comment._id },

      // meta, createdAt => default 값 입력
      // reply는 지금x
    });
    comment.reply.group.push(reply._id);
    comment.save();

    user.comments.unshift(reply._id);
    await user.save();
    return res.status(201).json({ newCommentId: reply._id });
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const replyViewComment = async (req, res) => {
  console.log("replyViewComment");
  const { videoId, commentId } = req.params;

  try {
    // 유효성 검사

    const video = await Video.findById(videoId);
    if (!video) {
      return res.sendStatus(404);
    }
    // const user = await User.findById(req.session.user._id);
    // if (!user) {
    //   return res.sendStatus(404);
    // }

    // const comment = await Comment.findById(commentId).populate("reply.group");
    const comments = await Comment.findById(commentId).populate({
      path: "reply.group",
      populate: { path: "owner", select: "username", model: "User" },
    });

    if (!comments) {
      return res.sendStatus(404);
    }

    // if (comment.owner.toString() !== req.session.user._id) {
    //   console.log("아이디 불일치, 삭제 거부");
    //   return res.sendStatus(400);
    // }
    // 모델 쿼리

    return res.status(200).json({ replys: comments.reply.group });
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};
