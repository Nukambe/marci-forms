import { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNewForm } from "../store/forms";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const dispatch = useDispatch();
  const loadedForm = useSelector((state) => state.forms.newForm);
  const [title, setTitle] = useState(loadedForm.title);
  const [description, setDescription] = useState(loadedForm.description);
  const [questions, setQuestions] = useState(loadedForm.questions);
  const [headerNotes, setHeaderNotes] = useState(loadedForm.headerNotes);
  const [footerNotes, setFooterNotes] = useState(loadedForm.footerNotes);

  useEffect(() => {
    dispatch(
      updateNewForm({
        title,
        description,
        questions,
        headerNotes,
        footerNotes,
      })
    );
  }, [title, description, questions, headerNotes, footerNotes, dispatch]);

  return (
    <FormContext.Provider
      value={{
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
