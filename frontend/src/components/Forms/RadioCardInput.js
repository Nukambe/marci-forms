import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RadioCardInput({ question, changeAnswers }) {
  const [selection, setSelection] = useState("");

  useEffect(() => {
    if (selection === "") return;
    changeAnswers(question.id, selection);
  }, [selection]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium leading-6 text-gray-900">
          {question.text}
        </h2>
      </div>
      <RadioGroup value={selection} onChange={setSelection} className="mt-2">
        <RadioGroup.Label className="sr-only">{question.text}</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {question.options.map((option, index) => (
            <RadioGroup.Option
              key={index}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  "cursor-pointer focus:outline-none",
                  active ? "ring-2 ring-green-600 ring-offset-2" : "",
                  checked
                    ? "bg-green-600 text-white hover:bg-green-500"
                    : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                  "flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1"
                )
              }
            >
              <RadioGroup.Label as="span">{option}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
