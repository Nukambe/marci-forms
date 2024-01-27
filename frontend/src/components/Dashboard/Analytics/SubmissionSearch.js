import { useState } from "react";

export default function SubmissionSearch({
  submissionFilter,
  setSubmissionFilter,
}) {
  const now = new Date().toISOString().slice(0, 16);
  const [begin, setBegin] = useState("");
  const [end, setEnd] = useState(now);
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function searchFilters(meta, query) {
    const index = submissionFilter.findIndex((filter) => filter.meta === meta);
    if (index === -1) {
      setSubmissionFilter([...submissionFilter, { meta, query }]);
    } else {
      const newSubmissionFilter = [...submissionFilter];
      newSubmissionFilter[index].query = query;
      setSubmissionFilter(newSubmissionFilter);
    }
  }

  return (
    <div className="space-y-8 pl-16 pt-8">
      <div className="md:flex gap-x-8">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Begin
          </label>
          <div className="mt-2 w-64">
            <input
              type="datetime-local"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              value={begin}
              onChange={(e) => {
                setBegin(e.target.value);
                searchFilters("begin", e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            End
          </label>
          <div className="mt-2 w-64">
            <input
              type="datetime-local"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              value={end}
              onChange={(e) => {
                setEnd(e.target.value);
                searchFilters("end", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="lg:flex gap-x-8">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            User ID
          </label>
          <div className="mt-2 w-36">
            <input
              type="number"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                searchFilters("userId", e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            First Name
          </label>
          <div className="mt-2 w-64">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                searchFilters("firstName", e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Last Name
          </label>
          <div className="mt-2 w-64">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                searchFilters("lastName", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
