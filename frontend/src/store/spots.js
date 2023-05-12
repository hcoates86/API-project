import {csrfFetch} from './csrf';

const GET_SPOTS = 'spots/getAllSpots';
const VIEW_SPOT = 'spots/getSingleSpot';
const MAKE_SPOT = 'spots/makeSpot';
const UPDATE_SPOT ='spots/updateSpot';
const DELETE_SPOT ='spots/deleteSpot';

const getAllSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

const getSingleSpot = (spot) => {
    return {
        type: VIEW_SPOT,
        spot
    }
}

const makeSpot = (spot) => {
    return {
        type: MAKE_SPOT,
        spot
    }
}

const updateSpot = (spotId) => {
    return {
        type: UPDATE_SPOT,
        spotId
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
        const spots = await res.json()
        dispatch(getAllSpots(spots))
    }

};

export const fetchSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const spot = await res.json()
        dispatch(getSingleSpot(spot))
    } else {
        const errors = await res.json();
        return errors;
      }
}

export const createSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots/new', {
        method: 'POST',
        body: JSON.stringify(spot)
    });
    if (res.ok) {
        const newSpot = await res.json();
        dispatch(makeSpot(newSpot))
        return newSpot;
    }
    
}


export const updatedSpot = (spotId) => async (dispatch) => {
    // const res = await csrfFetch('/api/spots/new', {
    //     method: 'PUT',
    //     body: JSON.stringify(spot)
    // }); **fix

}

export const removeSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    
}





const initialState = {allSpots:{}, singleSpot: {}}


const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            const spotsState = {allSpots:{}};
            action.spots.Spots.forEach(spot => {
                spotsState.allSpots[spot.id] = spot
            })
            return spotsState
        case VIEW_SPOT:
            newState = {...state}
            newState.singleSpot = action.spot;
            return newState;
        case MAKE_SPOT:
            newState = Object.assign({}, state);

            return newState

     default:
        return state;
      }
    }


export default spotReducer;