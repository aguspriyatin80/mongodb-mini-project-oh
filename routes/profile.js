const express = require("express");
const router = express.Router();

const profileControllers = require("../controllers/profile");
const { Authentication } = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.post(
  "/",
  Authentication,
  multer.single("profilePhoto"),
  profileControllers.Create
);
router.get("/", profileControllers.GetAll);

module.exports = router;
