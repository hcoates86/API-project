// import { Link } from 'react-router-dom';
import './Spots.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot } from '../../store/spots';
import { useEffect } from 'react';

const ViewSpot = () => {
    const { spotId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpot(spotId));
      }, [dispatch, spotId]);

        const spot = useSelector((state) => {
       return state.spots.singleSpot;
    })  

    const alertP = () => alert('Feature Coming Soon...');

    if (!spot) return;
    const spotImages = spot.SpotImages;

    console.log('spot', spot);
    
    let avgStarS;
    let numReviewsS = "Reviews";

    if (!spot.avgStarRating) {
        avgStarS = "★New"
    } else avgStarS = `★${spot.avgStarRating.toFixed(1)}`

    if (spot.numReviews === +1) numReviewsS = "Review"; //added + and ===, check if still works
    


      return (
        <div id='outer-box'>
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
          <div id='reserve'>
            <p className='price'> ${spot.price} <span>night</span>
            </p>
            <p>{avgStarS} &#183; {spot.numReviews} {numReviewsS}</p>
            <button onClick={alertP} id='reserveButton'>Reserve</button>
          </div>
          <div id='outerImgBox'>
            <div className='previewBox'>
                    {spotImages?.map((image) => (
                        image.preview === true 
                        ? <img src={image.url} alt={spot.name} key={image.id}></img>
                        : <div key={image.id} className='innerImgBox'><img key={image.id} src={image.url} alt={spot.name}></img> </div>
                    ))}
            </div>
          </div>
            <div>
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p>{spot.description}</p>
            </div>
        </div>

        
      )
}

export default ViewSpot;