const express = require("express");

const crtl = require("../../controllers/users/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/users");

const { saveImages, updateAvatar } = require("../../controllers/cloudinary");

const router = express.Router();

//  sign-up
router.post("/register", validateBody(schemas.registerSchema), crtl.register);

router.get("/verify/:verificationCode", crtl.verifyEmail);

router.post("/verify", validateBody(schemas.emailSchema), crtl.resendVerifyEmail);

//  sign-in
router.post("/login", validateBody(schemas.loginSchema), crtl.login);

router.post("/subscribe", validateBody(schemas.subscribeSchema), crtl.subscribe);

router.get("/current", authenticate, crtl.getCurrent);

router.post("/logout", authenticate, crtl.logout);

router.post("/picture", authenticate, upload.single("file"), saveImages);

router.patch("/avatar", authenticate, upload.single("picture"), updateAvatar);

module.exports = router;
