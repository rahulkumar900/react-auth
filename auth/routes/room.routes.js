const express = require("express");
const router = express.Router();
const roomCtrl = require("../controller/room.controller");

router.route("/rooms").get(roomCtrl.list).post(roomCtrl.create);
router
  .route("/rooms/:id")
  .get(roomCtrl.read)
  .post(roomCtrl.update)
  .delete(roomCtrl.destroy);

module.exports = router;
