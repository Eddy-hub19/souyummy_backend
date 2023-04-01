const express = require("express");

const crtl = require("../../controllers/users/auth");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/users");

const router = express.Router();

//  sign-up
router.post("/register", validateBody(schemas.registerSchema), crtl.register);

router.get("/verify/:verificationCode", crtl.verifyEmail);

router.post("/verify", validateBody(schemas.emailSchema), crtl.resendVerifyEmail);

//  sign-in
router.post("/login", validateBody(schemas.loginSchema), crtl.login);

router.post(
  "/subscribe",
  validateBody(schemas.subscribeSchema),
  crtl.subscribe
);

router.get("/current", authenticate, crtl.getCurrent);

router.post("/logout", authenticate, crtl.logout);

module.exports = router;
