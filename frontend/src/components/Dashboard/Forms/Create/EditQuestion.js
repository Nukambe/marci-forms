import { useState } from "react";
import {
  EllipsisVerticalIcon,
  MinusCircleIcon,
} from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const types = [
  { type: "Text", placeholder: "Text answer here..." },
  { type: "Radio", placeholder: "" },
  { type: "Number", placeholder: "01234" },
  {
    type: "Datetime-local",
    placeholder: "",
  },
];

export default function EditQuestion({
  question,
  changeType,
  changeText,
  changeOptionText,
  addOption,
  removeOption,
  removeQuestion,
  setActive,
}) {
  const [showTypes, setShowTypes] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2" onClick={() => setActive()}>
      <input // Question text
        type="text"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
        placeholder="Enter your question here..."
        value={question.text}
        onChange={(e) => changeText(e.target.value)}
      />
      {question.active && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            {question.type !== 2 && (
              <input // Response type
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                type={types[question.type - 1].type.toLowerCase()}
                placeholder={types[question.type - 1].placeholder}
                disabled
              />
            )}
            {question.type === 2 && ( // Radio response type
              <div className="w-full flex flex-col gap-1">
                {question.options.map(
                  (
                    option,
                    index // Options
                  ) => (
                    <div key={index} className="flex items-center gap-4">
                      <input type="radio" disabled />
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        value={option}
                        onChange={(e) =>
                          changeOptionText(e.target.value, index)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="text-red-500"
                      >
                        <MinusCircleIcon className="w-8" />
                      </button>
                    </div>
                  )
                )}
                <button type="button" onClick={addOption}>
                  <PlusCircleIcon className="w-8 text-green-500" />
                </button>
              </div>
            )}
            <button // Response type dropdown
              type="button"
              className="relative w-fit h-fit bg-slate-400 rounded-full"
              onClick={() => setShowTypes(!showTypes)}
            >
              <EllipsisVerticalIcon className="w-8 text-white" />
              {showTypes && (
                <div className="absolute right-10 top-2 bg-slate-500 py-4 px-8 flex flex-col gap-2 rounded-md space-y-2">
                  {types.map((type, index) => (
                    <input
                      key={index}
                      type="button"
                      className="w-full text-right cursor-pointer text-white hover:bg-slate-600 py-1 px-4 rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        changeType(index + 1);
                        setShowTypes(false);
                      }}
                      value={type.type}
                    />
                  ))}
                </div>
              )}
            </button>
          </div>
          <div>
            <button
              className="flex items-center gap-2 bg-red-800 py-1 pl-4 pr-1 rounded-full text-white ml-auto"
              onClick={removeQuestion}
            >
              <span>Remove</span>
              <MinusCircleIcon className="w-8 text-red-500 bg-white rounded-full" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
