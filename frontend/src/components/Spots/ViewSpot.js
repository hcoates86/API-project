// import { Link } from 'react-router-dom';
import './Spots.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot } from '../../store/spots';
import { getUserReviews, getSpotReviews } from '../../store/reviews';
import { useEffect, useState } from 'react';


const ViewSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    //check if user owns this spot
    const [thisUser, setThisUser] = useState(false);
    //check if user's already left a review here
    const [reviewExists, setReviewExists] = useState(false);

    const alertP = () => alert('Feature Coming Soon...');

    useEffect(() => {
      dispatch(fetchSpot(spotId));
      dispatch(getSpotReviews(spotId));
      dispatch(getUserReviews());
    }, [dispatch, spotId])

    const spot = useSelector((state) => {
    return state.spots.singleSpot;
    })

    const user = useSelector((state) => {
      return state.session.user
    })

    const reviews = Object.values(
      useSelector((state) => (
        state.reviews.spot ? state.reviews.spot : []
        ))
    )

    const userReviews = Object.values(useSelector((state) => (
      state.reviews.user ? state.reviews.user : []
      ))
    )

    useEffect(()=> {
      if (user && spot && spot.ownerId === user.id) {
        setThisUser(true)
      } else setThisUser(false)
    }, [user, spot])

    if (!spot || !spot.SpotImages || !spot.Owner) return null;
    // if (!user) return null;
    if (!reviews) return null;

    const spotImages = spot.SpotImages;


    
    // const userHasReview = userReviews.filter(review => review.userId === user.id)
    
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
          {thisUser ? (
            <></>
          ) : (
          <div>       
            <button>Post Your Review</button>
            <p>Be the first to post a review!</p>
          </div>
          )}
          
          {reviews.map(review => (
            <div key={review.id}>
            <h2>{review.User.firstName}</h2>
            </div>
          ))}
        </div>
        </>
      )
}

export default ViewSpot;