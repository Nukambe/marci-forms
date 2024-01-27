const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Forms, Question } = require('../../db/models');

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { title, header, subHeader, headerNotes, questions, footerNotes } = req.body;
        const bulkQuestions = [];

        const form = await Forms.create({
            title: title,
            header: header,
            subheader: subHeader,
            headerNotes: headerNotes,
            footerNotes: footerNotes
        }, { validate: true });

        questions.forEach(question => {
            const { asterisk, text, typeId } = question;
            bulkQuestions.push({
                text: text,
                typeId: parseInt(typeId),
                formId: form.id
            });
        });

        const createdQuestions = await Question.bulkCreate(bulkQuestions, { validate: true });
        return res.json({ form, createdQuestions });
    })
);

module.exports = router;
