import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String },
});

userSchema.pre("save", async function () {
  console.log("raw password: " + this.password);
  const saltRound = 5;
  // // bcrypt.hash(this.password,saltRound,function(err,hash){})
  // 콜백 방식
  this.password = await bcrypt.hash(this.password, saltRound);
  console.log("hash password: " + this.password);
});

userSchema.static(
  "comparePassword",
  async function (rawPassword, hashPassword) {
    const match = await bcrypt.compare(rawPassword, hashPassword);
    return match;
  }
);

const User = mongoose.model("user", userSchema);

export default User;
