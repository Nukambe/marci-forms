import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForms } from "../../../store/forms";
import { getSubmissionsByFormId } from "../../../store/submissions";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import SubmissionSearch from "./SubmissionSearch";
import QuestionAccordion from "./QuestionAccordion";

export default function Analytics() {
  const { formId } = useParams();
  const dispatch = useDispatch();
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [submissionFilter, setSubmissionFilter] = useState([]);
  const form = useSelector((state) =>
    state.forms.forms.find((form) => form.id === parseInt(formId))
  );
  const submissions = useSelector((state) => state.submissions.submissions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getForms())
      .then(() =>
        dispatch(
          getSubmissionsByFormId(
            formId,
            new URLSearchParams({ sortBy: "createdAt", order: "DESC" })
          )
        )
      )
      .then(() => setLoading(false));
  }, [dispatch, formId]);

  useEffect(() => {
    setFilteredSubmissions(submissions);
  }, [submissions]);

  useEffect(() => {
    if (!submissions) return;
    setFilteredSubmissions(
      submissions.filter((submission) => {
        const include = [];

        submissionFilter.forEach((filter) => {
          if (!filter.meta) {
            const answer = submission.answers.find(
              (answer) => answer.questionId === filter.question
            );
            include.push(answer.value.includes(filter.query));
          } else {
            switch (filter.meta) {
              case "begin":
                console.log(
                  "submission.createdAt",
                  submission.createdAt,
                  "filter.query",
                  filter.query
                );
                include.push(
                  new Date(submission.createdAt) > new Date(filter.query)
                );
                break;
              case "end":
                include.push(
                  new Date(submission.createdAt) < new Date(filter.query)
                );
                break;
              case "userId":
                include.push(submission.userId === parseInt(filter.query));
                break;
              case "firstName":
                include.push(submission.User.firstName.includes(filter.query));
                break;
              case "lastName":
                include.push(submission.User.lastName.includes(filter.query));
                break;
              default:
                break;
            }
          }
        });
        return include.every((bool) => bool === true);
      })
    );
  }, [submissionFilter, submissions]);

  return (
    !loading && (
      <div className="relative flex min-h-[90vh] flex-col xl:flex-row">
        <div className="xl:fixed w-full xl:w-2/3 flex-shrink px-2">
          {/* left */}
          <div className="w-full">
            {/* top */}
            <SubmissionSearch
              submissionFilter={submissionFilter}
              setSubmissionFilter={setSubmissionFilter}
            />
          </div>
          <div className="flex flex-col justify-end items-center px-8 pt-8">
            {/* bottom */}
            <h2 className="font-semibold flex-shrink">{form?.title}</h2>
            <BarChart form={form} submissions={filteredSubmissions} />
          </div>
        </div>
        <div className="xl:absolute xl:top-0 xl:right-0 h-fit xl:w-1/3 w-full">
          {/* right */}
          <QuestionAccordion
            questions={form?.questions}
            filteredSubmissions={filteredSubmissions}
            submissionFilter={submissionFilter}
            setSubmissionFilter={setSubmissionFilter}
          />
        </div>
      </div>
    )
  );
}
