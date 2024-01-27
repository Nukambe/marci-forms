const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Forms, Question, Submission } = require("../../db/models");

router.get(
  //get all forms
  "/",
  asyncHandler(async (_req, res) => {
    const forms = await Forms.findAll();
    return res.json({ forms });
  })
);

router.patch(
  //update form
  "/:formId",
  asyncHandler(async (req, res) => {
    const formId = parseInt(req.params.formId);
    const { title, description, headerNotes, footerNotes, questions } =
      req.body;
    const form = await Forms.findByPk(formId);

    if (form.questions !== questions) {
      const submissions = await Submission.findAll({ where: { formId } });
      await submissions.forEach((submission) => submission.destroy());
    }

    form.set({
      title,
      description,
      headerNotes: headerNotes.map((n) => n.text),
      footerNotes: footerNotes.map((n) => n.text),
      questions,
    });
    form.save();
    return res.json(form);
  })
);

router.post(
  //create form
  "/",
  asyncHandler(async (req, res, next) => {
    const { title, description, headerNotes, footerNotes, questions } =
      req.body;

    const form = await Forms.create({
      title,
      description,
      headerNotes: headerNotes.map((n) => n.text),
      footerNotes: footerNotes.map((n) => n.text),
      questions,
    });
    form.save();

    return res.json(form);
  })
);

router.delete(
  //delete form
  "/:formId",
  asyncHandler(async (req, res) => {
    const formId = parseInt(req.params.formId);
    const form = await Forms.findByPk(formId);
    form.destroy();
    return res.json({ formId });
  })
);

module.exports = router;
