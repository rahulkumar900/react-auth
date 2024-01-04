const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/userCtrl");

router.route("/users").get(userCtrl.list).post(userCtrl.create);
router.post("/login", userCtrl.login);

router.param("id", userCtrl.setReqUser);

router
  .route("/users/:id")
  .get(userCtrl.isAuth, userCtrl.read)
  .delete(userCtrl.isAuth, userCtrl.deleteUser)
  .put(userCtrl.isAuth, userCtrl.updateUser);
module.exports = router;
