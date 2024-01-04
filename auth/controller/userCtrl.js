const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
var { expressjwt } = require("express-jwt");
const { response } = require("../app");
require("dotenv").config();

const create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const user = new User({ name, email, password });
    await user.save();
    return res.status(200).json({ message: "User Created successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({ message: "User doesn't exists" });
    }
    if (!user.authenticate(password)) {
      console.log("authentication failed");
      res.status(401).json({ error: "Email and password doesn't match." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    res.status(200).json({
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const isAuth = expressjwt({
//   secret: process.env.SECRET,
//   algorithms: ["HS256"],
//   userProperty: "auth",
// });

const isAuth = async (req, res, next) => {
  let token;
  token = req.cookies.t;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      req.auth = await User.findOne({ _id: decoded._id });
      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized token" });
    }
  } else {
    res.status(401).json({ error: "Not authorized token" });
  }
};

const list = async (req, res, next) => {
  try {
    const users = await User.find()
      .populate("tasks")
      .select("name email tasks")
      .exec();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setReqUser = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).populate("tasks").exec();

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  } catch (error) {
    res.status(400).json({ error: "User not found" });
  }
};

const read = async (req, res, next) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.json(req.profile);
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.profile);
    if (!user) {
      res.status(400).json({ error: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    if (updatedUser) {
      res.status(200).json({ message: "User successfully updated" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = User.findById(req.profile);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    const deletedUser = await User.deleteOne(user);
    if (deletedUser) {
      res.status(200).json({ message: `user deleted successfully ` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  list,
  create,
  login,
  isAuth,
  setReqUser,
  read,
  deleteUser,
  updateUser,
};
