import { csrfFetch } from "./csrf";

const SET_SUBMISSIONS = "submissions/SET_SUBMISSIONS";

const setSubmissions = (submissions) => {
  return {
    type: SET_SUBMISSIONS,
    payload: submissions,
  };
};

export const getSubmissionsByFormId = (formId, query) => async (dispatch) => {
  const res = await csrfFetch(`/api/submissions/${formId}?${query}`);
  const { submissions } = await res.json();
  dispatch(setSubmissions(submissions));
  return submissions;
};

export const getSubmissions = (query) => async (dispatch) => {
  const res = await csrfFetch(`/api/submissions?${query}`);
  const { submissions } = await res.json();
  dispatch(setSubmissions(submissions));
  return submissions;
};

export const createSubmission =
  (answers, formId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/submissions/${formId}`, {
      method: "POST",
      body: JSON.stringify({ answers, userId }),
    });
    const data = await res.json();
    return data.submission;
  };

const initialState = { submissions: null };
const submissionsReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_SUBMISSIONS:
      newState.submissions = action.payload;
      return newState;
    default:
      return state;
  }
};

export default submissionsReducer;
