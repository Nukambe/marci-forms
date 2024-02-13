import { v4 as uuidv4 } from "uuid";
import { DragDropList, DragDropItem } from "../../../DragNDrop";
import EditQuestion from "./EditQuestion";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
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
  const [newForm, setNewForm] = useState({
    title: "",
    questions: [],
    headerNotes: [],
    footerNotes: [],
    description: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [publishState, setPublishState] = useState({
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (form) {
      const headerNotes = form.headerNotes.map((note) => ({
        id: uuidv4(),
        text: note,
      }));
      const footerNotes = form.footerNotes.map((note) => ({
        id: uuidv4(),
        text: note,
      }));
      setNewForm(
        JSON.parse(JSON.stringify({ ...form, headerNotes, footerNotes }))
      );
    }
  }, [form]);

  function publishForm() {
    setPublishState({ loading: true, error: null });
    setShowModal(true);
    const errors = [];
    if (!newForm.title) errors.push("Title is required");
    if (!newForm.questions.length)
      errors.push("At least one question is required");
    newForm.questions?.forEach((q) => {
      if (!q.text) errors.push("Question text is required");
      if (q.type === 2 && !q.options.length)
        errors.push("At least one option is required");
    });
    if (errors.length) {
      setPublishState({ loading: false, error: errors });
      return;
    }

    if (formId) {
      dispatch(updateForm(newForm, formId))
        .then(() => setPublishState({ loading: false, error: null }))
        .catch((err) => setPublishState({ loading: false, error: [err] }));
    } else {
      dispatch(createForm(newForm))
        .then(() => setPublishState({ loading: false, error: null }))
        .catch((err) => setPublishState({ loading: false, error: [err] }));
    }
  }

  const setTitle = (title) => {
    setNewForm({ ...newForm, title });
  };

  const setDescription = (description) => {
    setNewForm({ ...newForm, description });
  };

  const setHeaderNotes = (headerNotes) => {
    setNewForm({ ...newForm, headerNotes });
  };

  const setQuestions = (questions) => {
    if (JSON.stringify(questions) === JSON.stringify(newForm.questions)) return; // prevent unnecessary re-renders
    setNewForm(JSON.parse(JSON.stringify({ ...newForm, questions })));
  };

  const setFooterNotes = (footerNotes) => {
    setNewForm(JSON.parse(JSON.stringify({ ...newForm, footerNotes })));
  };

  const setQuestionText = (id, text) => {
    const questions = JSON.parse(JSON.stringify(newForm.questions));
    questions.find((q) => q.id === id).text = text;
    setQuestions(questions);
  };

  const setQuestionType = (id, type) => {
    const questions = JSON.parse(JSON.stringify(newForm.questions));
    questions.find((q) => q.id === id).type = type;
    setQuestions(questions);
  };

  const setOptionText = (id, index, text) => {
    const questions = JSON.parse(JSON.stringify(newForm.questions));
    questions.find((q) => q.id === id).options[index] = text;
    setQuestions(questions);
  };

  const addOption = (id) => {
    const questions = JSON.parse(JSON.stringify(newForm.questions));
    questions.find((q) => q.id === id).options.push("");
    setQuestions(questions);
  };

  const removeOption = (id, index) => {
    const questions = JSON.parse(JSON.stringify(newForm.questions));
    questions.find((q) => q.id === id).options.splice(index, 1);
    setQuestions(questions);
  };

  const addQuestion = () => {
    const questions = JSON.parse(JSON.stringify(newForm.questions));
    questions.push({
      id: uuidv4(),
      type: 1,
      text: "",
      options: ["YES", "NO", "N/A"],
      active: true,
    });
    setQuestions(questions);
  };

  const removeQuestion = (id) => {
    let questions = JSON.parse(JSON.stringify(newForm.questions));
    questions = questions.filter((q) => q.id !== id);
    setQuestions(questions);
  };

  const setActive = (id) => {
    const questions = JSON.parse(JSON.stringify(newForm.questions));
    questions.forEach((q) => (q.active = false));
    questions.find((q) => q.id === id).active = true;
    setQuestions(questions);
  };

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return (
    <>
      <div className="mx-auto">
        <div className="mx-auto max-w-3xl">
          {form && <EditAlert />}
          <div className="flex justify-end mb-8 gap-x-4">
            <button
              type="button"
              onClick={publishForm}
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
                value={newForm.title}
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
                value={newForm.description}
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
            <DragDropList items={newForm.headerNotes} setItems={setHeaderNotes}>
              {newForm.headerNotes?.map((note) => (
                <DragDropItem key={note.id} id={note.id}>
                  <input //header note input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Note..."
                    value={note.text}
                    onChange={(e) => {
                      const notes = JSON.parse(
                        JSON.stringify(newForm.headerNotes)
                      );
                      notes.find((n) => n.id === note.id).text = e.target.value;
                      setHeaderNotes(notes);
                    }}
                  />
                  <button //remove header note
                    type="button"
                    onClick={() => {
                      let notes = JSON.parse(
                        JSON.stringify(newForm.headerNotes)
                      );
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
              type="button"
              className="flex items-center gap-x-2 bg-green-600 rounded-md px-2 py-1 text-white font-semibold hover:bg-green-500"
              onClick={() => {
                const notes = JSON.parse(JSON.stringify(newForm.headerNotes));
                notes.push({ id: uuidv4(), text: "" });
                setHeaderNotes(notes);
              }}
            >
              Add Header Note
              <span>
                <PlusCircleIcon className="w-8" />
              </span>
            </button>
            <DragDropList items={newForm.questions} setItems={setQuestions}>
              {newForm.questions?.map((question) => (
                <DragDropItem
                  key={question.id}
                  id={question.id}
                  active={question.active}
                >
                  <EditQuestion
                    question={question}
                    setActive={() => setActive(question.id)}
                    changeText={(text) => setQuestionText(question.id, text)}
                    changeType={(type) => setQuestionType(question.id, type)}
                    removeQuestion={() => removeQuestion(question.id)}
                    changeOptionText={(text, index) =>
                      setOptionText(question.id, index, text)
                    }
                    addOption={() => addOption(question.id)}
                    removeOption={(index) => removeOption(question.id, index)}
                  />
                </DragDropItem>
              ))}
            </DragDropList>
            <button //add question
              type="button"
              className="flex items-center gap-x-2 bg-green-600 rounded-md px-2 py-1 text-white font-semibold hover:bg-green-500"
              onClick={addQuestion}
            >
              Add Question
              <span>
                <PlusCircleIcon className="w-8" />
              </span>
            </button>
            <DragDropList items={newForm.footerNotes} setItems={setFooterNotes}>
              {newForm.footerNotes?.map((note) => (
                <DragDropItem key={note.id} id={note.id}>
                  <input //footer note input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Note..."
                    value={note.text}
                    onChange={(e) => {
                      const notes = JSON.parse(
                        JSON.stringify(newForm.footerNotes)
                      );
                      notes.find((n) => n.id === note.id).text = e.target.value;
                      setFooterNotes(notes);
                    }}
                  />
                  <button //remove footer note
                    type="button"
                    onClick={() => {
                      let notes = JSON.parse(
                        JSON.stringify(newForm.footerNotes)
                      );
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
              type="button"
              className="flex items-center gap-x-2 bg-green-600 rounded-md px-2 py-1 text-white font-semibold hover:bg-green-500"
              onClick={() => {
                const notes = JSON.parse(JSON.stringify(newForm.footerNotes));
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
