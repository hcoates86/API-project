import { Link } from 'react-router-dom';


const SpotsIndexItem = ({ spot }) => {
    let image = spot.previewImage || null;
    return (
        <div>
          <Link to={`/spots/${spot.id}`} title={spot.name}>
            <img className="thumbnail" src={image} alt={spot.name}></img>
            {spot.city}, {spot.state}
            <p id="rating">★{spot.avgRating}</p>
            <p id="price">${spot.price} night</p>
          </Link>

        </div>
    );
  };
  
  export default SpotsIndexItem;