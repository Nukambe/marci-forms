import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function QuestionSearch({
  question,
  submissionFilter,
  setSubmissionFilter,
}) {
  const [query, setQuery] = useState(
    submissionFilter.find((filter) => filter.question === question)?.query || ""
  );

  function handleSearch(e) {
    e.preventDefault();
    const index = submissionFilter.findIndex(
      (filter) => filter.question === question
    );
    if (index === -1) {
      setSubmissionFilter([...submissionFilter, { question, query }]);
    } else {
      const newSubmissionFilter = [...submissionFilter];
      newSubmissionFilter[index].query = query;
      setSubmissionFilter(newSubmissionFilter);
    }
  }

  return (
    <div className="mx-2 mt-4">
      <form className="mt-2 flex rounded-md shadow-sm" onSubmit={handleSearch}>
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            value={query}
            onChange={(e) => {
              if (!e.target.value)
                setSubmissionFilter(
                  submissionFilter.filter(
                    (filter) => filter.question !== question
                  )
                );
              setQuery(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-white"
        >
          Search
        </button>
      </form>
    </div>
  );
}
