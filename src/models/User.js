import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, required: true, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: { type: String },
  videos: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "video" },
  ],
  comments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const saltRound = 5;
    this.password = await bcrypt.hash(this.password, saltRound);
    console.log("hash password: " + this.password);
  }
});

userSchema.static(
  "comparePassword",
  async function (rawPassword, hashPassword) {
    const match = await bcrypt.compare(rawPassword, hashPassword);
    return match;
  }
);

const User = mongoose.model("User", userSchema);

export default User;
