import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserSpots } from '../../store/session';
import {removeSpot } from '../../store/spots';
import SpotsIndexItem from './SpotsIndexItem';


const ManageSpots = () => {

    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getUserSpots())
    }, [dispatch]);

    let spots = useSelector(state => {
        return state.user.spots
    })

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