const express = require("express");
const router = express.Router();

const studentControllers = require("../controllers/student");
const { Authentication } = require("../middlewares/auth");

router.post("/register", studentControllers.Register);
router.post("/login", studentControllers.Login);
router.get("/", studentControllers.GetAll);
router.put("/edit/:id", Authentication, studentControllers.Edit);
router.delete("/delete/:id", Authentication, studentControllers.Delete);

module.exports = router;
