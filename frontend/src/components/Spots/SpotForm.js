import { useState } from 'react';
import {createSpot} from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const SpotForm = ({ spot }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [aState, setAState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [errors, setErrors] = useState({});
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newSpot = {
            address, city, state: aState, country, lat, lng, name, description, price
        }
        console.log(newSpot);
        // if (!Object.values(errors).length) {
            newSpot = dispatch(createSpot(newSpot))
            // history.push(`/spots/${newSpot.id}`);
        // }
    }



    return (
        <form onSubmit={handleSubmit}>
        <h1>Create a New Spot</h1>
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <label>Country
        <input type='text' className='txtInput' 
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='country' />
        </label>
        
        <label>Address
        <input type='text' className='txtInput' 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='address' />
        </label>

        <label>City
        <input type='text' className='txtInput' 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='city' />
        </label>

        <label>State
        <input type='text' className='txtInput' 
            value={aState}
            onChange={(e) => setAState(e.target.value)}
            placeholder='STATE' />
        </label>

        <label>Latitude
        <input type='text' className='txtInput' 
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder='latitude' />
        </label>    
            
        <label>Longitude  
        <input type='text' className='txtInput' 
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder='longitude' />
        </label>      


        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>

        <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Please write at least 30 characters'
        />

        <h2>Create a title for your spot</h2>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

        <input type='text' 
            className='txtInput' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name of your spot' />
        

        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <label>$
        <input type='number' 
            className='numInput' 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Price per night (USD)' />
        </label>

        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>


        <input type='text' className='txtInput' 
            placeholder='Preview Image URL' />
            <input type='text' className='txtInput' placeholder='Image URL' />
            <input type='text' className='txtInput' placeholder='Image URL' />
            <input type='text' className='txtInput' placeholder='Image URL' />
            <input type='text' className='txtInput' placeholder='Image URL' />

        <input type='submit' value='Create Spot' />

        </form>


    )
}

export default SpotForm;