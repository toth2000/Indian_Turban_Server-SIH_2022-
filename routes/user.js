const express = require("express");

const {
  verifyTokenAuthorization,
  verifyTokenAdminAuthorization,
} = require("../middleware/auth");

const { updateUser, deleteUser, getUser } = require("../controller/user");

const router = express.Router();

router.get("/", (req, res) => res.send("User Route"));

router.put("/:id", verifyTokenAuthorization, updateUser);
router.delete("/:id", verifyTokenAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAdminAuthorization, getUser);

module.exports = router;
