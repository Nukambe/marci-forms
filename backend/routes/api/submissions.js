const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Submission, User, Forms } = require("../../db/models");
const { Op } = require("sequelize");

router.post(
  "/:formId",
  asyncHandler(async (req, res) => {
    const formId = req.params.formId;
    const { answers, userId } = req.body;
    // const dateNow = new Date();
    // const submissions = await Submission.findAll({
    //   where: {
    //     formId: formId,
    //     createdAt: {
    //       [Op.gte]: new Date(new Date().setDate(dateNow.getDate() - body.days)),
    //     },
    //   },
    // });
    const submission = await Submission.create({
      userId,
      formId,
      answers,
    });
    return res.json({ submission });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { sortBy, order, limit, page } = req.query;
    const submissions = await Submission.findAll({
      include: [
        { model: User, attributes: ["firstName", "lastName"] },
        { model: Forms, attributes: ["title"] },
      ],
      attributes: ["id", "userId", "formId", "answers", "createdAt"],
      order: [[sortBy, order]],
      limit: parseInt(limit || Number.MAX_SAFE_INTEGER),
      offset: (parseInt(page) - 1) * parseInt(limit || 0),
    });
    return res.json({ submissions });
  })
);

router.get(
  "/:formId",
  asyncHandler(async (req, res) => {
    const { sortBy, order, limit, page } = req.query;
    const formId = req.params.formId;
    const submissions = await Submission.findAll({
      where: { formId },
      include: [{ model: User, attributes: ["firstName", "lastName"] }],
      attributes: ["id", "userId", "answers", "createdAt"],
      order: [[sortBy, order]],
      limit: parseInt(limit || Number.MAX_SAFE_INTEGER),
      offset: (parseInt(page || 0) - 1) * parseInt(limit || 0),
    });
    return res.json({ submissions });
  })
);

module.exports = router;
