import { useEffect, useState } from "react";

export default function TextInput({ question, inputType, changeAnswers }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value === "") return;
    changeAnswers(question.id, value);
  }, [value]);

  return (
    <div>
      <label
        htmlFor={question.id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {question?.text}
      </label>
      <div className="relative mt-2">
        <input
          type={inputType}
          name={question.id}
          id={question.id}
          required
          className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-green-600"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
