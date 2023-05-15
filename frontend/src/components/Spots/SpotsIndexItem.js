import { Link } from 'react-router-dom';
import './Spots.css';

const SpotsIndexItem = ({ spot }) => {
    let image = spot.previewImage || null;
    return (
      <Link to={`/spots/${spot.id}`} title={spot.name}>
        <div className='spotBox'>
          <div></div>

          <img className="thumbnail" src={image} alt={spot.name}></img>
          <div className='infoBox'>

            <div className='infoBox-left'>
              <p className='location'>{spot.city}, {spot.state}</p>
              <p><span id="cash">${spot.price}</span><span> night</span></p>
            </div>
            
            <div className='infoBox-right'>
              <p className="stars">★{spot.avgRating}</p>
            </div>
          </div>

        </div>
      </Link>

        
    );
  };
  
  export default SpotsIndexItem;