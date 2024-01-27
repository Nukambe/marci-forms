const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const formsRouter = require("./forms.js");
const submitRouter = require('./submit.js');
const submissionRouter = require('./submissions.js');
const createRouter = require('./create.js');
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth.js");
const { User } = require("../../db/models");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/forms", formsRouter);
router.use("/submit", submitRouter);
router.use("/submissions", submissionRouter);
router.use("/create", createRouter);

//-----------TEST ROUTES-----------
// router.post("/test", function (req, res) {
//   res.json({ requestBody: req.body });
// });

// router.get(
//   "/set-token-cookie",
//   asyncHandler(async (_req, res) => {
//     const user = await User.findOne({
//       where: {
//         username: "demoMarci",
//       },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
//   })
// );

// router.get("/restore-user", restoreUser, (req, res) => {
//   return res.json(req.user);
// });

// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });
//-----------TEST ROUTES-----------

module.exports = router;
