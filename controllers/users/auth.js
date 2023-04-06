const bcrypt = require("bcrypt");
const { User } = require("../../models/users");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const gravatar = require("gravatar");

const ctrlWraper = require("../ctrlWrapper");
const { sendEmail } = require("../../helpers");
const { HttpError } = require("../../routes/errors/HttpErrors");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (rec, res) => {
  const { email, password } = rec.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "This email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = uuid.v4();

  const newUser = await User.create({ ...rec.body, password: hashPassword, avatarURL, verificationCode });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/auth/verify/${verificationCode}" >Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(401, "Email already verified");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
  });

  res.json({
    message: "Email verify succsess",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(401, "Email already verified");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/auth/verify/${user.verificationCode}" >Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email sent success",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Email or password wrong or invalid");
  }

  const comparePassword = bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(404, "Email or password wrong or invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "500h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user,
  });
};

const subscribe = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  await User.findByIdAndUpdate(user._id, {
    subscription: true,
  });
  const sendingEmail = {
    to: email,
    subject: "email verification",
    html: `<p>  user subscribed </p>`,
  };

  await sendEmail(sendingEmail);

  res.json({
    message: "user subscribed, email sending success",
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  console.log(req.user);
  res.json({
    email,
    name,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json("Logout success");
};

module.exports = {
  register: ctrlWraper(register),
  verifyEmail: ctrlWraper(verifyEmail),
  resendVerifyEmail: ctrlWraper(resendVerifyEmail),
  login: ctrlWraper(login),
  getCurrent: ctrlWraper(getCurrent),
  logout: ctrlWraper(logout),
  subscribe: ctrlWraper(subscribe),
};
