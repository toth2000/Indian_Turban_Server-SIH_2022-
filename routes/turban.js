const express = require("express");

const {
  verifyTokenAuthorization,
  verifyTokenAdminAuthorization,
} = require("../middleware/auth");

const {
  createTurban,
  editTurban,
  deleteTurban,
  getAllTurbans,
} = require("../controller/turban");

const router = express.Router();

router.get("/", getAllTurbans);

router.put(
  "/:id",
  // verifyTokenAuthorization,
  editTurban
);
router.delete(
  "/:id",
  // verifyTokenAdminAuthorization,
  deleteTurban
);
router.post(
  "/",
  // verifyTokenAdminAuthorization,
  createTurban
);

module.exports = router;
