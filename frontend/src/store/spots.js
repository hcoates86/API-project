

const GET_SPOTS = 'spots/getAllSpots';

const getAllSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

export const getSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots');
    if (res.ok) {
        const spots = await res.json()
        dispatch(getAllSpots(spots))
        console.log(spots);
        // return spots;
    }

};













const initialState = {allSpots:{}}


const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
            const spotsState = {allSpots:{}};
            action.spots.Spots.forEach(spot => {
                spotsState.allSpots[spot.id] = spot
            })
            return spotsState
     default:
        return state;
      }
    }


export default spotReducer;