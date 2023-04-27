import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxLength: 80,
  },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.pre("save", async function () {
  console.log("we are about to save:", this);
  this.title = "hahahahah i am middleware";
});
const video = mongoose.model("video", videoSchema);

export default video;
