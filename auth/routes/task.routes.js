const express = require("express");
const router = express.Router();
const taskCtrl = require("../controller/taskCtrl");

router.route("/tasks").get(taskCtrl.list).post(taskCtrl.create);

module.exports = router;
