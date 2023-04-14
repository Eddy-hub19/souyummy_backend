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
    subject: "Email Verification",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Please activate your account</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(235, 243, 212);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="text-align: right;">
                    <div style="padding-bottom: 20px;"><img
                        src="https://eddy-hub19.github.io/soyummy/static/media/logo_desc.3326a095578a5f612526f7ab93edd379.svg" alt="So Yummy"
                        style="width: 80px;"></div>
                  </div>
                  <div style="padding: 20px; background-color: rgb(235, 243, 212);">
                    <div style="color: rgb(25, 26, 20); text-align: left;">
                      <h1 style="margin: 1rem 0">Final step...</h1>
                      <p style="padding-bottom: 16px">Follow this link to verify your email address.</p>
                      <p style="padding-bottom: 16px"><a target="_blank" href="${BASE_URL}/auth/verify/${verificationCode}"
                          style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">Confirm
                          now</a></p>
                      <p style="padding-bottom: 16px">If you didn’t ask to verify this address, you can ignore this email.</p>
                      <p style="padding-bottom: 16px">Thanks,<br>The So-Yummy team</p>
                    </div>
                  </div>
                  <div style="padding-top: 20px; color: rgb(139, 170, 54); text-align: center;">
                    <p style="padding-bottom: 16px">Enjoy you recipes with us ♥</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>`,
  };
  await sendEmail(verifyEmail);

  // const payload = {
  //   id: newUser._id,
  // };

  // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "70h" });
  res.status(201).json(newUser);
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
    subject: "Email Verification",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Please activate your account</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(235, 243, 212);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="text-align: right;">
                    <div style="padding-bottom: 20px;"><img
                        src="https://eddy-hub19.github.io/soyummy/static/media/logo_desc.3326a095578a5f612526f7ab93edd379.svg" alt="So Yummy"
                        style="width: 80px;"></div>
                  </div>
                  <div style="padding: 20px; background-color: rgb(235, 243, 212);">
                    <div style="color: rgb(25, 26, 20); text-align: left;">
                      <h1 style="margin: 1rem 0">Final step...</h1>
                      <p style="padding-bottom: 16px">Follow this link to verify your email address.</p>
                      <p style="padding-bottom: 16px"><a target="_blank" href="${BASE_URL}/auth/verify/${verificationCode}"
                          style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">Confirm
                          now</a></p>
                      <p style="padding-bottom: 16px">If you didn’t ask to verify this address, you can ignore this email.</p>
                      <p style="padding-bottom: 16px">Thanks,<br>The So-Yummy team</p>
                    </div>
                  </div>
                  <div style="padding-top: 20px; color: rgb(139, 170, 54); text-align: center;">
                    <p style="padding-bottom: 16px">Enjoy you recipes with us ♥</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email sent success",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const prevUser = await User.findOne({ email });

  if (!prevUser) {
    throw HttpError(404, "Email or password wrong or invalid");
  }

  const comparePassword = await bcrypt.compare(password, prevUser.password);
  if (!comparePassword) {
    throw HttpError(404, "Email or password wrong or invalid");
  }

  const payload = {
    id: prevUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "70h" });
  await User.findByIdAndUpdate(prevUser._id, { token });
  const user = await User.findOne({ token });
  res.json({
    user,
    token,
  });
};

const subscribe = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log("subscr", user);

  if (!user) {
    throw HttpError(401, "Email not found");
  }
  await User.findByIdAndUpdate(user._id, {
    subscription: true,
  });
  const sendingEmail = {
    to: email,
    subject: "Subscribe confirmation from So-Yummy ",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for subscribing</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(235, 243, 212);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="text-align: right;">
                    <div style="padding-bottom: 20px;"><img
                        src="https://eddy-hub19.github.io/soyummy/static/media/logo_desc.3326a095578a5f612526f7ab93edd379.svg" alt="Company"
                        style="width: 56px;"></div>
                  </div>
                  <div style="padding: 20px; background-color: rgb(235, 243, 212);">
                    <div style="color: rgb(0, 0, 0); text-align: left;">
                      <h1 style="margin: 1rem 0">Thanks for subscribing!</h1>
                      <p style="padding-bottom: 16px">The So-Yummy Newsletter is the best way to find out about the universe of the recipes <em>...and
                          beyond</em>.</p>
                      <p style="padding-bottom: 16px">Once or twice a month, you will now receive our newsletter with information about new,
                        breakfasts, miscellaneous and desserts, as well as 100 way to make delicious chicken, new discoveries and much more. </p>
                      <p style="padding-bottom: 16px">Of course, you can't manage your subscription and you will receive the mails from us till
                        the end of the entire world ;)</p>
                      <p style="padding-bottom: 16px">We're really happy to have you on board!</p>
                      <p style="padding-bottom: 16px">Best regards,<br><em>The So-Yummy team</em></p>
                    </div>
                  </div>
                  <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                    <p style="padding-bottom: 16px">Made with ♥ in Zhmerynka</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>`,
  };

  await sendEmail(sendingEmail);

  res.json({
    message: "user subscribed, email sending success",
  });
};

const getCurrent = async (req, res) => {
  const user = req.user;
  console.log(req.user);
  res.json(user);
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
