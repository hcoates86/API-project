import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { removeSpot, getUserSpots } from '../../store/spots';
import { getUserReviews, getSpotReviews } from '../../store/reviews';
import SpotsIndexItem from './SpotsIndexItem';


const ManageSpots = () => {

    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getUserSpots())
    }, [dispatch]);

    let spots = Object.values(
        useSelector(state => (
        state.spots.user ? state.spots.user : []
        ))
    )

    if (!spots) spots = [];
    console.log(spots);

    const deleteSpot = (spotId) => {
        dispatch(removeSpot(spotId))
    } 



    return (
        <div>
            <h1>Manage Spots</h1>
            <Link to='/spots/new'>Create a New Spot</Link>

            
            {spots.map((spot) => (
                <>
                <SpotsIndexItem spot={spot} key={spot.id}/>
                <Link to={`/user/spots/${spot.id}`}><button>Update</button></Link>
                <button onClick={deleteSpot(spot.id)}>Delete</button>
                </>
            ))}

        </div>
    )



}

export default ManageSpots