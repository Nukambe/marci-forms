import { useSelector } from "react-redux";
import { csrfFetch } from "./csrf";

const SET_FORMS = "forms/SET_FORMS";
const SET_NEWFORM = "forms/SET_NEWFORM";

const setForms = (forms) => {
  return {
    type: SET_FORMS,
    payload: forms,
  };
};

const setNewForm = (form) => {
  return {
    type: SET_NEWFORM,
    payload: form,
  };
};

export const getForms = () => async (dispatch) => {
  const res = await csrfFetch("/api/forms");
  const { forms } = await res.json();
  dispatch(setForms(forms));
  return forms;
};

export const getForm = (formId) => async (dispatch) => {
  const forms = useSelector((state) => state.forms.forms);
  const form = forms.find((form) => form.id === parseInt(formId));
  return form;
};

export const updateNewForm = (form) => (dispatch) => {
  dispatch(setNewForm(form));
  return form;
};

export const createForm = (form) => async (dispatch) => {
  const res = await csrfFetch("/api/forms", {
    method: "POST",
    body: JSON.stringify(form),
  });
  const { newForm } = await res.json();
  dispatch(getForms());
  return newForm;
};

export const updateForm = (form, formId) => async (dispatch) => {
  const res = await csrfFetch(`/api/forms/${formId}`, {
    method: "PATCH",
    body: JSON.stringify(form),
  });
  const { updatedForm } = await res.json();
  dispatch(getForms());
  return updatedForm;
};

export const deleteForm = (formId) => async (dispatch) => {
  const res = await csrfFetch(`/api/forms/${formId}`, {
    method: "DELETE",
  });
  const { deletedForm } = await res.json();
  dispatch(getForms());
  return deletedForm;
};

const initialState = {
  forms: [],
  newForm: {
    title: "",
    description: "",
    headerNotes: [],
    footerNotes: [],
    questions: [],
  },
};
const formsReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_FORMS:
      newState.forms = action.payload;
      return newState;
    case SET_NEWFORM:
      newState.newForm = action.payload;
      return newState;
    default:
      return state;
  }
};

export default formsReducer;
