import { v4 as uuidv4 } from "uuid";
import { DragDropList, DragDropItem } from "../../../DragNDrop";
import { FormContext } from "../../../../context/formContext";
import EditQuestion from "./EditQuestion";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createForm, updateForm } from "../../../../store/forms";
import PublishModal from "../../../Modal/PublishModal";
import EditAlert from "./EditAlert";

export default function CreateForm() {
  const dispatch = useDispatch();
  const { formId } = useParams();
  const form = useSelector((state) =>
    state.forms.forms.find((f) => f.id === parseInt(formId || 0))
  );
  const [showModal, setShowModal] = useState(false);
  const [publishState, setPublishState] = useState({
    loading: false,
    error: null,
  });
  const {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    setQuestions,
    headerNotes,
    setHeaderNotes,
    footerNotes,
    setFooterNotes,
  } = useContext(FormContext);

  useEffect(() => {
    if (form) {
      setTitle(form.title);
      setDescription(form.description);
      setQuestions(
        form.questions.map((q) => ({ ...q, id: uuidv4(), active: false }))
      );
      setHeaderNotes(form.headerNotes.map((n) => ({ id: uuidv4(), text: n })));
      setFooterNotes(form.footerNotes.map((n) => ({ id: uuidv4(), text: n })));
    } else {
      setTitle("");
      setDescription("");
      setQuestions([]);
      setHeaderNotes([]);
      setFooterNotes([]);
    }
  }, [
    form,
    setTitle,
    setDescription,
    setQuestions,
    setHeaderNotes,
    setFooterNotes,
  ]);

  function publishForm(e) {
    e.preventDefault();
    setPublishState({ loading: true, error: null });
    setShowModal(true);
    const form = {
      title,
      description,
      questions,
      headerNotes,
      footerNotes,
    };
    const errors = [];
    if (!form.title) errors.push("Title is required");
    if (!questions.length) errors.push("At least one question is required");
    questions?.forEach((q) => {
      if (!q.text) errors.push("Question text is required");
      if (q.type === 2 && !q.options.length)
        errors.push("At least one option is required");
    });
    if (errors.length) {
      setPublishState({ loading: false, error: errors });
      return;
    }

    if (formId) {
      dispatch(updateForm(form, formId))
        .then(() => setPublishState({ loading: false, error: null }))
        .catch((err) => setPublishState({ loading: false, error: [err] }));
    } else {
      dispatch(createForm(form))
        .then(() => setPublishState({ loading: false, error: null }))
        .catch((err) => setPublishState({ loading: false, error: [err] }));
    }
  }

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {form && <EditAlert />}
          <div className="flex justify-end mb-8 gap-x-4">
            <button
              onClick={(e) => publishForm(e)}
              className="bg-green-600 py-2 px-6 rounded-md text-white font-bold text-lg hover:bg-green-500"
            >
              Publish
            </button>
          </div>
          <div className="space-y-4 mb-16">
            <div className="border-b-2 px-3 pb-1.5 pt-2.5 focus-within:ring-2 focus-within:ring-green-600">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-4xl sm:leading-6"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="border-b-2 px-3 pb-1.5 pt-2.5 focus-within:ring-2 focus-within:ring-green-600">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-900"
              >
                Description
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-2xl sm:leading-6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="text-2xl mb-8 flex flex-col gap-y-2 sm:flex-row justify-between">
            Jane Doe
            <span>
              {mm}/{dd}/{yyyy}
            </span>
          </div>
          <form className="space-y-12">
            <DragDropList items={headerNotes} setItems={setHeaderNotes}>
              {headerNotes.map((note) => (
                <DragDropItem key={note.id} id={note.id}>
                  <input //header note input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Note..."
                    value={note.text}
                    onChange={(e) => {
                      const notes = [...headerNotes];
                      notes.find((n) => n.id === note.id).text = e.target.value;
                      setHeaderNotes(notes);
                    }}
                  />
                  <button //remove header note
                    onClick={(e) => {
                      e.preventDefault();
                      let notes = [...headerNotes];
                      notes = notes.filter((n) => n.id !== note.id);
                      setHeaderNotes(notes);
                    }}
                  >
                    <MinusCircleIcon className="w-8 text-red-600 hover:text-red-500" />
                  </button>
                </DragDropItem>
              ))}
            </DragDropList>
            <button //add header note
              className="flex items-center gap-x-2 bg-green-600 rounded-md px-2 py-1 text-white font-semibold hover:bg-green-500"
              onClick={(e) => {
                e.preventDefault();
                const notes = [...headerNotes];
                notes.push({ id: uuidv4(), text: "" });
                setHeaderNotes(notes);
              }}
            >
              Add Header Note
              <span>
                <PlusCircleIcon className="w-8" />
              </span>
            </button>
            <DragDropList items={questions} setItems={setQuestions}>
              {questions.map((question) => (
                <DragDropItem key={question.id} id={question.id}>
                  <EditQuestion question={question} />
                </DragDropItem>
              ))}
            </DragDropList>
            <button //add question
              className="flex items-center gap-x-2 bg-green-600 rounded-md px-2 py-1 text-white font-semibold hover:bg-green-500"
              onClick={(e) => {
                e.preventDefault();
                const newQuestions = [...questions];
                newQuestions.forEach((q) => (q.active = false));
                newQuestions.push({
                  id: uuidv4(),
                  type: 1,
                  text: "",
                  options: ["YES", "NO", "N/A"],
                  active: true,
                });
                setQuestions(newQuestions);
              }}
            >
              Add Question
              <span>
                <PlusCircleIcon className="w-8" />
              </span>
            </button>
            <DragDropList items={footerNotes} setItems={setFooterNotes}>
              {footerNotes.map((note) => (
                <DragDropItem key={note.id} id={note.id}>
                  <input //footer note input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Note..."
                    value={note.text}
                    onChange={(e) => {
                      const notes = [...footerNotes];
                      notes.find((n) => n.id === note.id).text = e.target.value;
                      setFooterNotes(notes);
                    }}
                  />
                  <button //remove footer note
                    onClick={(e) => {
                      e.preventDefault();
                      let notes = [...footerNotes];
                      notes = notes.filter((n) => n.id !== note.id);
                      setFooterNotes(notes);
                    }}
                  >
                    <MinusCircleIcon className="w-8 text-red-600 hover:text-red-500" />
                  </button>
                </DragDropItem>
              ))}
            </DragDropList>
            <button //add footer note
              className="flex items-center gap-x-2 bg-green-600 rounded-md px-2 py-1 text-white font-semibold hover:bg-green-500"
              onClick={(e) => {
                e.preventDefault();
                const notes = [...footerNotes];
                notes.push({ id: uuidv4(), text: "" });
                setFooterNotes(notes);
              }}
            >
              Add Footer Note
              <span>
                <PlusCircleIcon className="w-8" />
              </span>
            </button>
          </form>
        </div>
      </div>
      <PublishModal
        open={showModal}
        setOpen={setShowModal}
        state={publishState}
      />
    </>
  );
}
