// import { Link } from 'react-router-dom';
import './Spots.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot } from '../../store/spots';
import { useEffect } from 'react';

const ViewSpot = () => {
    const { spotId } = useParams();
    const spot = useSelector((state) => {
       return state.spots.singleSpot;
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpot(spotId));
      }, [dispatch, spotId]);

    const alertP = () => alert('Feature Coming Soon...');

    if (!spot) return;
    const spotImages = spot.SpotImages;
    
    let avgStarS;
    let numReviewsS = "Reviews";

    if (!spot.avgStarRating) {
        avgStarS = "★New"
    } else avgStarS = `★${spot.avgStarRating.toFixed(1)}`

    if (spot.numReviews == 1) numReviewsS = "Review";
    


      return (
        <div id='outer-box'>
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
          <div id='reserve'>
            <span>${spot.price}
            <label>night</label> 
            </span>
            <span>{avgStarS}</span>
            <span>{spot.numReviews} {numReviewsS}</span>
            <button onClick={alertP} id='reserveButton'>Reserve</button>
          </div>
          <div id='outerImgBox'>
            <div className='previewBox'>
                    {spotImages.map((image) => (
                        image.preview === true 
                        ? <img src={image.url}></img>
                        : <div className='innerImgBox'><img src={image.url}></img> </div>
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