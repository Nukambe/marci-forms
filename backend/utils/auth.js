const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config").jwtconfig;
const { User } = require("../db/models");

const setTokenCookie = (res, user) => {
  const token = jwt.sign({ data: user.toSafeObject() }, secret, {
    expiresIn: parseInt(expiresIn), // 604,800 seconds = 1 week
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayLoad) => {
    if (err) return next();

    try {
      const { id } = jwtPayLoad.data;
      req.user = await User.scope("currentUser").findByPk(id);
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

const requireAuth = [
  restoreUser,
  function (req, _res, next) {
    if (req.user) return next();

    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = ["Unauthorized"];
    err.status = 401;
    return next(err);
  },
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
