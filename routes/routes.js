const express = require("express");
const router = express.Router();
const { userRegister, userLogin, userChangePassword, userChangeEmail, userchangeUserName, userForgetPassword } = require("../controllers/auth")

const authMiddleware = require("../middleware/home");


router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/changePassword", authMiddleware, userChangePassword)
router.post("/changeEmail", authMiddleware, userChangeEmail)
router.post("/changeuserName", authMiddleware, userchangeUserName)
router.post("/forgetPassword" , userForgetPassword)

module.exports = router;