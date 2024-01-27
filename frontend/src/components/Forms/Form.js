import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createSubmission } from "../../store/submissions";
import QuestionItem from "../QuestionItem";
import SubmitModal from "../Modal/SubmitModal";

export default function Form() {
  const dispatch = useDispatch();
  const { formId } = useParams();
  const { id, firstName, lastName } = useSelector(
    (state) => state.session.user
  );
  const form = useSelector((state) =>
    state.forms.forms.find((form) => form.id === parseInt(formId))
  );
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ loading: false, err: null });

  useEffect(() => {
    if (!open) {
      setTimeout(() => setState({ loading: false, err: null }), 500);
      setSubmitting(false);
    }
  }, [open]);

  const changeAnswers = (key, value) => {
    const index = answers.findIndex((answer) => answer.questionId === key);
    const newAnswers = [...answers];

    if (index !== -1) {
      newAnswers[index].value = value;
    } else {
      newAnswers.push({ questionId: key, value });
    }
    setAnswers(newAnswers);
  };

  function handleSubmitForm() {
    setSubmitting(true);
    setState({ ...state, loading: true });
    setOpen(true);

    if (answers.length !== form.questions.length) {
      const missing = form.questions
        .filter(
          (question) =>
            !answers.find((answer) => answer.questionId === question.id)
        )
        .map((question) => question.text);
      setSubmitting(false);
      setState({ loading: false, err: missing });
      return;
    }

    dispatch(createSubmission(answers, formId, id))
      .then(() => setState({ ...state, loading: false }))
      .catch((err) => setState({ ...state, err: [err] }));
  }

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return (
    <>
      <div className="bg-green-900 py-16 sm:py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {form?.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {form?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-2xl mb-4 flex flex-col gap-y-2 sm:flex-row justify-between">
            {firstName} {lastName}
            <span>
              {mm}/{dd}/{yyyy}
            </span>
          </div>
          <ul className="divide-y divide-gray-100 py-5">
            {form?.headerNotes?.map((note, index) => (
              <li
                key={index}
                className="mt-1 text-sm leading-6 text-gray-600 py-2"
              >
                {note}
              </li>
            ))}
          </ul>
          <form className="space-y-8">
            <fieldset disabled={submitting} className="space-y-8">
              {form?.questions?.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  changeAnswers={changeAnswers}
                />
              ))}
            </fieldset>
            <ul className="divide-y divide-gray-100">
              {form?.footerNotes?.map((note, index) => (
                <li
                  key={index}
                  className="mt-1 text-sm leading-6 text-gray-600 py-2"
                >
                  {note}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              onClick={() => handleSubmitForm()}
              disabled={submitting}
            >
              Submit Form
            </button>
          </form>
        </div>
      </div>
      <SubmitModal state={state} open={open} setOpen={setOpen} />
    </>
  );
}
