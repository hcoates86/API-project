
import {csrfFetch} from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const USER_SPOTS = 'spots/getUserSpots';


const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const userSpots = (spots) => {
  return {
      type: USER_SPOTS,
      spots
  }
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

  export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

  export const getUserSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/session/spots');
    if (res.ok) {
        const spots = await res.json()
        dispatch(userSpots(spots))
    } else {
      const errors = await res.json();
      return errors;
  }};

  const initialState = 
  {
    user: null
  }

  const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case SET_USER:
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
      case REMOVE_USER:
        newState = Object.assign({}, state);
        newState.user = null;
        return newState;
      case USER_SPOTS:
        newState = {...state}
        newState.user.spots = action.spots
        return newState;
      default:
        return state;
    }
  };

    export default sessionReducer;