const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

router.post("/users", userController.inviteUser);

router.get("/get", userController.getSpecificUser);

module.exports = router;
