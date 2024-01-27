const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { User } = require("../../db/models");
const { Op } = require("sequelize");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.signup({ firstName, lastName, email, password });

    await setTokenCookie(res, user);

    return res.json({ user });
  })
);

router.get(
  //get all users
  "/",
  asyncHandler(async (req, res) => {
    const { sortBy, order, limit, page, search } = req.query;
    const { count, rows } = await User.findAndCountAll({
      attributes: ["id", "email", "firstName", "lastName", "role"],
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      },
    });
    return res.json({ users: rows, count });
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { role } = req.body;
    const user = await User.findByPk(parseInt(req.params.id));
    await user.update({ role });
    await user.save();
    return res.json({ user });
  })
);

module.exports = router;
