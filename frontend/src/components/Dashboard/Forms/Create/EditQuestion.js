import { Fragment, useContext } from "react";
import { FormContext } from "../../../../context/formContext";
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  MinusCircleIcon,
} from "@heroicons/react/20/solid";
import QuestionDisplay from "./QuestionDisplay";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditQuestion({ question }) {
  const { questions, setQuestions } = useContext(FormContext);

  function changeType(type) {
    const newQuestions = [...questions];
    newQuestions.find((q) => q.id === question.id).type = type;
    setQuestions(newQuestions);
  }
  function changeText(text) {
    const newQuestions = [...questions];
    newQuestions.find((q) => q.id === question.id).text = text;
    setQuestions(newQuestions);
  }
  function removeQuestion(e) {
    e.preventDefault();
    let newQuestions = [...questions];
    newQuestions = newQuestions.filter((q) => q.id !== question.id);
    setQuestions(newQuestions);
  }
  function setActive() {
    const newQuestions = [...questions];
    newQuestions.forEach((q) => (q.active = false));
    newQuestions.find((q) => q.id === question.id).active = true;
    setQuestions(newQuestions);
  }

  return (
    <div className="w-full" onClick={() => setActive()}>
      <div className="sm:flex sm:items-baseline sm:justify-between">
        <div className="sm:w-0 sm:flex-1">
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            placeholder="Question..."
            value={question.text}
            onChange={(e) => changeText(e.target.value)}
          />
        </div>

        <div className="mt-4 flex items-center justify-between sm:ml-6 sm:mt-0 sm:flex-shrink-0 sm:justify-start">
          <Menu as="div" className="relative ml-auto inline-block text-left">
            <div>
              <Menu.Button className="-my-2 flex items-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {[
                    { id: 1, label: "Text" },
                    { id: 2, label: "Radio" },
                    { id: 3, label: "Number" },
                    { id: 4, label: "Date/Time" },
                  ].map((option, index) => (
                    <Menu.Item key={index}>
                      {({ close }) => (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            changeType(option.id);
                            close();
                          }}
                          className={classNames(
                            question.type === option.id
                              ? "bg-green-100 text-gray-900"
                              : "text-gray-700 hover:bg-green-50",
                            "flex justify-between px-4 py-2 text-sm w-full"
                          )}
                        >
                          <span>{option.label}</span>
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      {question.active && (
        <div className="mt-2 px-4">
          <QuestionDisplay question={question} />
          <div className="flex justify-end mt-4">
            <button
              onClick={(e) => removeQuestion(e)}
              className="flex items-center gap-x-2 bg-red-600 rounded-full py-1 pl-3 pr-1 text-white font-semibold text-sm hover:bg-red-500"
            >
              Delete
              <span>
                <MinusCircleIcon className="w-6" />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
