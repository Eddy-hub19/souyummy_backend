const express = require("express");

const crtl = require("../../controllers/users/auth");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/users");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), crtl.register);

router.post("/login", validateBody(schemas.loginSchema), crtl.login);

router.get("/current", authenticate, crtl.getCurrent);

router.post("/logout", authenticate, crtl.logout);

module.exports = router;
