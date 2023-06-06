import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserSpots } from '../../store/session';
import SpotsIndexItem from './SpotsIndexItem';


const ManageSpots = () => {

    const dispatch = useDispatch();

    const spots = useSelector(state => {
        return state.user.spots
    })

    useEffect(() => {
        dispatch(getUserSpots())
      }, [dispatch]);

    //     const spot = useSelector((state) => {
    //    return state.spots.singleSpot;
    // })  

    // useEffect(() => {
    //     dispatch(updatedSpot(spot));
    //   }, [dispatch, spot]);


    return (
        <div>
            <h1>Manage Spots</h1>
            <Link to='/spots/new'>Create a New Spot</Link>


            {spots.map((spot) => (
                <>
                <SpotsIndexItem spot={spot} key={spot.id}/>
                <Link to='/'><button>Update</button></Link>
                <Link to={`/spots/${spot.id}`}><button>Delete</button></Link>
                </>
            ))}

        </div>
    )



}

export default ManageSpots