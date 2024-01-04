const { Timestamp } = require("mongodb");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      trim: true,
    },
    email: {
      type: String,
      required: "Email is required",
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    hashed_password: { type: String, required: true },
    salt: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema
  .virtual("password")
  .get(function () {
    return this._password;
  })
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  });

userSchema.methods = {
  encryptPassword: function (plainPass) {
    return bcrypt.hashSync(plainPass, this.salt);
  },
  makeSalt: function () {
    return bcrypt.genSaltSync(12);
  },
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hashed_password);
  },
};
const User = mongoose.model("User", userSchema);

module.exports = User;
