import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  meta: {
    like: {
      count: { type: Number, required: true, default: 0 },
      users: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
    },
    unlke: {
      count: { type: Number, required: true, default: 0 },
      users: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
    },
    // 유저 아이디 검사용, 카운트용으로 분할 필요
  },
  video: { type: mongoose.Types.ObjectId, required: true, ref: "video" },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  reply: {
    class: { type: Number, default: 0 },
    group: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  },
  //  class = 0(원 댓글), or class = 1(답글)
  //  원댓글.group = 답글 아이디들
  // 답글.group = 원댓의 아이디
  // 자기 자신을 REF 할 수 있는지 불분명함. 버그 가능성
});
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
