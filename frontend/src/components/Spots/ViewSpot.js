// import { Link } from 'react-router-dom';
import './Spots.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot } from '../../store/spots';
import { useEffect } from 'react';
import noImgUrl from '../../images/NoImage.png';


const ViewSpot = () => {
    const { spotId } = useParams();
    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpot(spotId));
      }, [dispatch, spotId]);

    const spot = useSelector((state) => {
    return state.spots.singleSpot;
    })

    //put a useeffect to check empty spots on grid and fill them with no img ORR do that with CSS??

    const alertP = () => alert('Feature Coming Soon...');

    if (!spot || !spot.SpotImages || !spot.Owner) return;

    const spotImages = spot.SpotImages;
    
    let avgStarS;
    let numReviewsS = "Reviews";

    if (!spot.avgStarRating) {
        avgStarS = "New"
    } else avgStarS = spot.avgStarRating.toFixed(1)

    if (spot.numReviews === +1) numReviewsS = "Review";
    
    
    // let imgArr = [...spotImages];
    // let prevImage;
    // let prevUrl = spot.SpotImages.filter(image => image.preview === true)[0];

    // let urlArr = spot.SpotImages.map(image => image.url)



  //   if (urlArr.length < 4) {
  //     urlArr.fill(noImgUrl, urlArr.length - 1, 3)
  //   }
  //  let prevImage = prevUrl.url || noImgUrl;   

      return (
        <div id='outer-box'>
          <h1>{spot.name}</h1>
          <h3>{spot.city}, {spot.state}, {spot.country}</h3>
         
            <div className='grid-container'>

                    {spotImages?.map((image) => (
                        image.preview === true 
                        ? <img id='preview' src={image.url} alt={spot.name} key={image.id}></img>
                        : <img key={image.id} src={image.url} alt={spot.name}></img>
                    ))}

            {/* <img id='preview' src={prevImage} alt={spot.name}></img>
            {urlArr.map(image => (
              <img src={image} alt={spot.name}></img>
            ))}

            <img src={image1} alt={spot.name}></img>
            <img src={image2} alt={spot.name}></img>
            <img src={image3} alt={spot.name}></img>
            <img src={image4} alt={spot.name}></img> */}
          </div>
          

            {console.log(noImgUrl)}

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

        
      )
}

export default ViewSpot;