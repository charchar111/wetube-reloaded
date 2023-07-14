"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var commentSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now
  },
  meta: {
    like: {
      count: {
        type: Number,
        required: true,
        "default": 0
      },
      users: [{
        type: _mongoose["default"].Types.ObjectId,
        required: true,
        ref: "User"
      }]
    },
    unlke: {
      count: {
        type: Number,
        required: true,
        "default": 0
      },
      users: [{
        type: _mongoose["default"].Types.ObjectId,
        required: true,
        ref: "User"
      }]
    }
    // 유저 아이디 검사용, 카운트용으로 분할 필요
  },

  video: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: "video"
  },
  owner: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: "User"
  },
  reply: {
    "class": {
      type: Number,
      "default": 0
    },
    group: [{
      type: _mongoose["default"].Types.ObjectId,
      ref: "Comment"
    }]
  }
  //  class = 0(원 댓글), or class = 1(답글)
  //  원댓글.group = 답글 아이디들
  // 답글.group = 원댓의 아이디
  // 자기 자신을 REF 할 수 있는지 불분명함. 버그 가능성
});

var Comment = _mongoose["default"].model("Comment", commentSchema);
var _default = Comment;
exports["default"] = _default;