import {csrfFetch} from './csrf';

const SPOT_REVIEWS = 'reviews/getSpotReviews';
const USER_REVIEWS = 'reviews/userReviews';

const getReviews = (reviews) => {
    return {
        type: SPOT_REVIEWS,
        reviews
    }
}

const userReviews = (reviews) => {
    return {
        type: USER_REVIEWS,
        reviews
    }
}

export const getSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
        const reviews = await res.json()
        dispatch(getReviews(reviews))
    } else {
        const errors = await res.json();
        return errors;
    }

};

export const getUserReviews = () => async (dispatch) => {
    const res = await csrfFetch('/api/session/reviews');
    if (res.ok) {
        const reviews = await res.json()
        dispatch(userReviews(reviews))
    } else {
        const errors = await res.json();
        return errors;
    }
}



const initialState = {spot: {}, user: {} }

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SPOT_REVIEWS:
            newState = {...state};
            if (action.reviews.Reviews.length) {
            action.reviews.Reviews.forEach(review => {
                newState.spot[review.id] = review
            })} else newState.spot = null;
            return newState;
        case USER_REVIEWS:
            newState = {...state};
            if (action.reviews.Reviews.length) {
            action.reviews.Reviews.forEach(review => {
                newState.user[review.id] = review
            })} else newState.user = null;
            return newState;
        default:
            return state;
    }


}

export default reviewReducer;