import { useContext } from "react";
import { FormContext } from "../../../../context/formContext";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

export default function QuestionDisplay({ question }) {
  const { questions, setQuestions } = useContext(FormContext);

  function changeOption(value, index) {
    const newQuestions = [...questions];
    newQuestions.find((q) => q.id === question.id).options[index] = value;
    setQuestions(newQuestions);
  }

  function addOption() {
    const newQuestions = [...questions];
    newQuestions.find((q) => q.id === question.id).options.push("");
    setQuestions(newQuestions);
  }

  function removeOption(index) {
    return () => {
      const newQuestions = [...questions];
      newQuestions.find((q) => q.id === question.id).options.splice(index, 1);
      setQuestions(newQuestions);
    };
  }

  let type = "";
  let value;
  switch (question.type) {
    case 1:
      type = "text";
      value = "Text...";
      break;
    case 2:
      type = "radio";
      break;
    case 3:
      type = "number";
      value = 1234;
      break;
    case 4:
      type = "datetime-local";
      break;
    default:
      break;
  }

  switch (question.type) {
    case 2:
      return (
        <div className="mt-2">
          <div className="flex gap-x-6 gap-y-2 flex-wrap">
            {question.options.map((option, index) => (
              <div key={index} className="flex w-fit items-center gap-x-1">
                <input
                  value={option}
                  onChange={(e) => changeOption(e.target.value, index)}
                  className="text-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1"
                />
                <div
                  onClick={removeOption(index)}
                  className="w-8 bg-red-600 hover:text-red-800 text-white hover:bg-red-400 px-1 rounded-md"
                >
                  <MinusIcon />
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={() => addOption()}
            className="w-8 bg-green-600 hover:text-green-800 text-white hover:bg-green-400 p-1 rounded-md mt-4"
          >
            <PlusIcon />
          </div>
        </div>
      );
    default:
      return (
        <div>
          <input
            disabled
            type={type}
            className="select-none border-none bg-gray-200 rounded-md text-gray-500"
            value={value}
          />
        </div>
      );
  }
}
