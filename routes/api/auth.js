const express = require("express");

const crtl = require("../../controllers/users/auth");
const { saveImages } = require("../../controllers/cloudinary");

const { validateBody, authenticate, uploadCloud } = require("../../middlewares");
const { schemas } = require("../../models/users");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), crtl.register);

router.post("/login", validateBody(schemas.loginSchema), crtl.login);

router.post("/subscribe", validateBody(schemas.subscribeSchema), crtl.subscribe);

router.get("/current", authenticate, crtl.getCurrent);

router.post("/logout", authenticate, crtl.logout);

router.post("/upload", uploadCloud.single("file"), saveImages);

module.exports = router;
