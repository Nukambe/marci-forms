import { useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import QuestionSearch from "./QuestionSearch";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../../../utils";
import { XMarkIcon } from "@heroicons/react/24/solid";

export function FilterTag({ filter, questions, removeFilter }) {
  return (
    <div
      key={filter.question}
      className="px-2 py-1 text-sm font-semibold text-green-900 bg-green-300 rounded-full flex items-center gap-x-1 w-fit"
    >
      {questions.find((question) => question.id === filter.question).text}:{" "}
      {filter.query}
      <button className="ml-2" onClick={() => removeFilter(filter.question)}>
        <XMarkIcon className="h-4 w-4 text-green-900 hover:text-red-500" />
      </button>
    </div>
  );
}

export default function QuestionAccordion({
  questions,
  filteredSubmissions,
  submissionFilter,
  setSubmissionFilter,
}) {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const newAnswers = questions.map((question) => ({
      id: question.id,
      question: question.text,
      answers: [],
    }));
    filteredSubmissions.forEach((submission) => {
      submission.answers.forEach(({ questionId, value }) => {
        newAnswers
          .find((newAnswer) => newAnswer.id === questionId)
          .answers.push({
            user: submission.User,
            answer: value,
            createdAt: submission.createdAt,
          });
      });
    });
    setAnswers(newAnswers);
  }, [questions, filteredSubmissions]);

  return (
    <div className="px-4 mt-8 pb-4">
      {submissionFilter.length > 0 &&
        !submissionFilter.every((filter) => filter.meta) && (
          <button
            className="mb-4 flex items-center gap-x-2 bg-slate-300 rounded-full px-2 py-1 text-sm font-semibold hover:bg-slate-400 hover:text-white"
            onClick={() => setSubmissionFilter([])}
          >
            Clear Filters
            <XMarkIcon className="h-4 w-4 hover:text-white" />
          </button>
        )}
      <ul className="flex flex-wrap gap-2 mb-4">
        {submissionFilter.map(
          (filter) =>
            filter.question && (
              <FilterTag
                key={filter.question}
                filter={filter}
                questions={questions}
                removeFilter={() =>
                  setSubmissionFilter(
                    submissionFilter.filter(
                      (sf) => sf.question !== filter.question
                    )
                  )
                }
              />
            )
        )}
      </ul>
      <div className="bg-green-50 shadow-lg">
        {answers.map((answer) => (
          <Disclosure key={answer.id}>
            {({ close }) => (
              <>
                <Disclosure.Button
                  onClick={(e) => {
                    setActiveQuestion(answer.id);
                    close();
                  }}
                  className="first:rounded-t-lg flex w-full justify-between bg-green-400 px-4 py-2 text-left text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500/75"
                >
                  <span>{answer.question}</span>
                  <ChevronUpIcon
                    className={`${
                      activeQuestion === answer.id ? "transform rotate-180" : ""
                    } w-5 h-5 text-green-900`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  {activeQuestion === answer.id && (
                    <Disclosure.Panel>
                      <QuestionSearch
                        question={answer.id}
                        submissionFilter={submissionFilter}
                        setSubmissionFilter={setSubmissionFilter}
                      />
                      <ul className="py-4 space-y-2">
                        {answer.answers.map((answer, index) => (
                          <li key={index} className="hover:bg-white py-1">
                            <div className="flex items-center justify-between px-4 gap-x-4">
                              <div className="text-sm font-medium leading-6 text-black">
                                {answer.user.firstName} {answer.user.lastName}
                              </div>
                              <div className="text-sm font-medium leading-6 text-black">
                                {answer.answer}
                              </div>
                              <div>
                                <time dateTime={answer.createdAt}>
                                  {formatDate(answer.createdAt)}
                                </time>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                  )}
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
        <div className="w-full h-4 bg-green-400 rounded-b-lg" />
      </div>
    </div>
  );
}
