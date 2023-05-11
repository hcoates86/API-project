import {csrfFetch} from './csrf';

const GET_SPOTS = 'spots/getAllSpots';
const VIEW_SPOT = 'spots/getSingleSpot';
const MAKE_SPOT = 'spots/makeSpot';

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
        console.log('spot', spot);
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