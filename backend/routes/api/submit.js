const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Submission } = require('../../db/models');

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const answers = req.body;
        const bulkAnswers = [];
        for (const answer in answers) {
            const questionId = answer === 'name' ? null : answer.split('-')[1];
            if (questionId) {
                bulkAnswers.push({
                    name: answers.name,
                    formId: answers.formId,
                    questionId: questionId,
                    answer: answers[answer]
                });
            }
        };
        const submissions = await Submission.bulkCreate(bulkAnswers, { validate: true });
        return res.json({ submissions });
    })
);

module.exports = router;
