import { useState } from 'react';
import { createSpot, postImage } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const SpotForm = ({ spot }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [aState, setAState] = useState('');
    const [country, setCountry] = useState('');
    // const [lat, setLat] = useState('');
    // const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [prevImg, setPrevImg] = useState('');
    const [imgurl, setImgurl] = useState('');

    const [errors, setErrors] = useState({});
    


    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorObj = {};
        if (!address) errorObj['address'] = 'Address is required' ;
        if (!city) errorObj['city'] = 'City is required';
        if (!aState) errorObj['state'] = 'State is required';
        if (!country) errorObj['country'] = 'Country is required';
        if (!name) errorObj['name'] = 'Name is required';
        if (name.length > 50) errorObj['name'] = "Name can't be more than 50 characters long";
        if (!description) errorObj['description'] = 'Description is required';
        if (!description > 30) errorObj['description'] = 'Description needs 30 or more characters';
        if (!price) errorObj['price'] = 'Price per night is required';
        if (!prevImg) errorObj['prevImg'] = 'Preview image is required'
        if (!imgurl1.endsWith('.png') || !imgurl1.endsWith('.jpg') || !imgurl1.endsWith('.jpeg')) {
            errorObj['imgurl1'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!imgurl2.endsWith('.png') || !imgurl2.endsWith('.jpg') || !imgurl2.endsWith('.jpeg')) {
            errorObj['imgurl2'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!imgurl3.endsWith('.png') || !imgurl3.endsWith('.jpg') || !imgurl3.endsWith('.jpeg')) {
            errorObj['imgurl3'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!imgurl4.endsWith('.png') || !imgurl4.endsWith('.jpg') || !imgurl4.endsWith('.jpeg')) {
            errorObj['imgurl4'] = 'Image URL must end in .png, .jpg, or .jpeg';
        }
        setErrors(errorObj);

        if (!(Object.values(errors).length)) {
        let newSpot = {
            address, city, state: aState, country, lat: 1, lng: 1, name, description, price
        }

            newSpot = dispatch(createSpot(newSpot))

            const noImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
            let images = [
                {url: prevImg, preview: true}, 
                {url: imgurl1 || noImgUrl, preview: false}, 
                {url: imgurl2 || noImgUrl, preview: false}, 
                {url: imgurl3 || noImgUrl, preview: false}, 
                {url: imgurl4 || noImgUrl, preview: false}
            ];

            images.forEach(image => {
                image["spotId"] = newSpot.id;
                dispatch(postImage(image))
            })

            history.push(`/spots/${newSpot.id}`);
        }
    }



    return (
        <form id='display' onSubmit={handleSubmit}>
        <div className='borderBox'>
        <h1>Create a New Spot</h1>
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <label>Country
        <input type='text' className='txtInput' 
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='country' 
            />
        </label>
        <p className='errors'>{errors.country}</p>

        <label>Address
        <input type='text' className='txtInput' 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='address' />
        </label>
        <p className='errors'>{errors.address}</p>

        <label>City
        <input type='text' className='txtInput' 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='city' />
        </label>
        <p className='errors'>{errors.city}</p>

        <label>State
        <input type='text' className='txtInput' 
            value={aState}
            onChange={(e) => setAState(e.target.value)}
            placeholder='STATE' />
        </label>
        <p className='errors'>{errors.state}</p>

        {/* <label>Latitude
        <input type='text' className='txtInput' 
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder='latitude' />
        </label>     */}
            
        {/* <label>Longitude  
        <input type='text' className='txtInput' 
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder='longitude' />
        </label>       */}
        </div>

        <div className='borderBox'>
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

        <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Please write at least 30 characters'
        />
        <p className='errors'>{errors.description}</p>
        </div>

        <div className='borderBox'>
        <h2>Create a title for your spot</h2>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

        <input type='text' 
            className='txtInput' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name of your spot'
            />
        <p className='errors'>{errors.name}</p>
        
        </div>

        <div className='borderBox'>
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <label>$
        <input type='number' 
            className='numInput' 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Price per night (USD)' />
        </label>
        <p className='errors'>{errors.price}</p>
        </div>

        <div className='borderBox'>
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>


        <input type='text' className='txtInput'
            value={prevImg}
            onChange={(e) => setPrevImg(e.target.value)}
            placeholder='Preview Image URL' />
        <p className='errors'>{errors.prevImg}{errors.imgurl}</p>

            <input type='text' className='txtInput' 
                value={imgurl1}
                onChange={(e) => setImgurl1(e.target.value)}
                placeholder='Image URL' />
            <p className='errors'>{errors.imgurl1}</p>
            <input type='text' className='txtInput' 
                value={imgurl2}
                onChange={(e) => setImgurl2(e.target.value)}
                placeholder='Image URL' />
            <p className='errors'>{errors.imgurl2}</p>
            <input type='text' className='txtInput' 
                value={imgurl3}
                onChange={(e) => setImgurl3(e.target.value)}
                placeholder='Image URL' />
            <p className='errors'>{errors.imgurl3}</p>
            <input type='text' className='txtInput' 
                value={imgurl4}
                onChange={(e) => setImgurl4(e.target.value)}
                placeholder='Image URL' />
            <p className='errors'>{errors.imgurl4}</p>
            </div>

        <div>
        <input type='submit' value='Create Spot' />
        </div>
        </form>


    )
}

export default SpotForm;