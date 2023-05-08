
import {csrfFetch} from './csrf';

export const CURRENT_USER = 'session/CURRENT_USER';
export const REMOVE_USER = 'session/REMOVE_USER';


export const sessionUser = (user) => ({
    type: CURRENT_USER,
    user
  });

  export const removeUser = () => ({
    type: REMOVE_USER
  });


  export const fetchUser = (user) => async (dispatch) => {
    const { credential, password } = user;
    const res = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password
      })
    });
  
    if (res.ok) {
      const data = await res.json();
      dispatch(sessionUser(data.user));
    } return res;
  };

  export const deleteUser = () => async (dispatch) => {
    const res = await fetch('/api/session', {
      method: 'DELETE',
      headers: {"Content-Type": "application/json"}
    })

    if (res.ok) {
      dispatch(removeUser())
    }else {
      const errors = await res.json();
      return errors;
  }

  }



  const initialState = 
  {
    user: null
  }

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CURRENT_USER:
          newState = Object.assign({}, state);
          newState.user = action.user;
          return newState;
        case REMOVE_USER:
            return initialState;
  default:
    return state
    
    }}

    export default sessionReducer;