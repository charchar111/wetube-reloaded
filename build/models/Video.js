"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var videoSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxLength: 80
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 20
  },
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now
  },
  hashtags: [{
    type: String,
    trim: true
  }],
  meta: {
    views: {
      type: Number,
      "default": 0,
      required: true
    },
    rating: {
      type: Number,
      "default": 0,
      required: true
    }
  },
  fileUrl: {
    type: String,
    required: true
  },
  thumbUrl: {
    type: String,
    required: true
  },
  owner: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: "User"
  },
  comments: [{
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: "Comment"
  }]
});

// videoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word.trim() : `#${word.trim()}`));
// });

videoSchema["static"]("formatHashtags", function (hashtags) {
  return hashtags.split(",").map(function (word) {
    return word.startsWith("#") ? word.trim() : "#".concat(word.trim());
  });
});
var video = _mongoose["default"].model("video", videoSchema);
var _default = video;
exports["default"] = _default;