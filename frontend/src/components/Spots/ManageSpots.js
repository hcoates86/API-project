import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updatedSpot } from '../../store/spots';


const ManageSpots = ({}) => {

    const dispatch = useDispatch();

        const spot = useSelector((state) => {
       return state.spots.singleSpot;
    })  

    useEffect(() => {
        dispatch(updatedSpot(spot));
      }, [dispatch, spot]);





    return (
        <div>
            <h1>Manage Spots</h1>
            <Link to='/spots/new'>Create a New Spot</Link>



        </div>
    )



}

export default ManageSpots