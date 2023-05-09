

const GET_SPOTS = 'spots/getAllSpots';

const getAllSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

export const getSpots = () => async (dispatch) => {
    const spots = await fetch('/api/spots');
    dispatch(getAllSpots(spots))
    console.log(spots);
    return spots;
};
















const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SPOTS:
            const spotsState = {};
            action.spots.allSpots.forEach(spot => {
                spotsState[spot.id] = spot
            })
            return spotsState
     default:
        return state;
      }
    }


export default spotReducer;