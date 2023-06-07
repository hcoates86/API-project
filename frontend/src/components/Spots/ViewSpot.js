// import { Link } from 'react-router-dom';
import './Spots.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot } from '../../store/spots';
import { useEffect, useState } from 'react';


const ViewSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [thisUser, setThisUser] = useState(false);
    const [reviewExists, setReviewExists] = useState(false);

    const alertP = () => alert('Feature Coming Soon...');

    useEffect(() => {
        dispatch(fetchSpot(spotId));
      }, [dispatch, spotId]);

    const spot = useSelector((state) => {
    return state.spots.singleSpot;
    })

    const user = useSelector((state) => {
      return state.session.user || null
    })

    if (!spot || !spot.SpotImages || !spot.Owner) return;

    const spotImages = spot.SpotImages;

    if (spot.ownerId === user.id) setThisUser(true);
    
    let avgStarS;
    let numReviewsS = "Reviews";

    if (!spot.avgStarRating) {
        avgStarS = "New"
    } else avgStarS = spot.avgStarRating.toFixed(1)

    if (spot.numReviews === +1) numReviewsS = "Review";
    
      return (
        <>
        <div id='outer-box'>
          <h1>{spot.name}</h1>
          <h3>{spot.city}, {spot.state}, {spot.country}</h3>
         
            <div className='grid-container'>

                    {spotImages?.map((image) => (
                        image.preview === true 
                        ? <img id='preview' src={image.url} alt={spot.name} key={image.id}></img>
                        : <img key={image.id} src={image.url} alt={spot.name}></img>
                    ))}

          </div>
          
           <div className='reserve'>
            <p className='price'><span>${spot.price}</span> night</p>
            <p className='res-reviews'><span id="star">★</span>{avgStarS} &#183; {spot.numReviews} {numReviewsS}</p>
            <button onClick={alertP} id='reserveButton'>Reserve</button>
          </div>

            <div className='spotDesc'>
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p>{spot.description}</p>
            </div>
        </div>
        <div id='review-box'>
          <h1><span id="star2">★</span> {avgStarS} &#183; {spot.numReviews} {numReviewsS}</h1>
          <div>       
            <button onClick={openSesame}>Post Your Review</button>
            <p>Be the first to post a review!</p>
          </div>

        </div>
        </>
      )
}

export default ViewSpot;