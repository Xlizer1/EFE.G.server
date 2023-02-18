import mongoose from "mongoose";
import { hasher } from "../utils/hasher.js";
import shortId from "shortid";

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  salt: String,
  admin: String,
});

UserSchema.pre("save", (next) => {
  if (!this.salt) {
    this.salt = shortId.generate();
  }

  if (this.password) {
    this.password = hasher(this.password, this.salt);
  }

  next();
});

const User = new mongoose.model("user", UserSchema);

export default User;
