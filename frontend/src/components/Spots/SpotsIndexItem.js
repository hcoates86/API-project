import { Link } from 'react-router-dom';


const SpotsIndexItem = ({ spot }) => {
    let image = spot.previewImage || '🗷';
    return (
        <div>
          <Link to={`/spots/${spot.id}`}>
            <img className="thumbnail" src={image} alt={spot.name}></img>
            {spot.city}, {spot.state}
          </Link>
            <p id="rating">★{spot.avgRating}</p>
            <p id="price">${spot.price} night</p>
            
          {/*if (spot.ownerId === session.user.id) {
          <div>
            <Link to={`/reports/${report.id}/edit`}
            >Edit</Link>
          </div>} */}
        </div>
    );
  };
  
  export default SpotsIndexItem;