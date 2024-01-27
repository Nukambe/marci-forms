import { csrfFetch } from "./csrf";

const SET_USERS = "submissions/SET_USERS";

const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

export const getUsers = (query) => async (dispatch) => {
  const res = await csrfFetch(`/api/users?${query}`);
  const { users, count } = await res.json();
  dispatch(setUsers({ users, count }));
  return { users, count };
};

export const updateUserRole = (role, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
  const { user } = await res.json();
  return user;
};

const initialState = { users: [] };
const usersReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_USERS:
      newState.users = action.payload;
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
