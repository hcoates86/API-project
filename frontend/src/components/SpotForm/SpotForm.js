import { useState, useEffect } from 'react';
import { createSpot, postImage } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './SpotForm.css';
// import noImgUrl from '../../images/NoImage.png';

const SpotForm = ({ noImgUrl }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.session.user
     })

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
    const [imgurl1, setImgurl1] = useState('');
    const [imgurl2, setImgurl2] = useState('');
    const [imgurl3, setImgurl3] = useState('');
    const [imgurl4, setImgurl4] = useState('');

    const [errors, setErrors] = useState({});
    
    // let errorLog = {};

    useEffect(()=> {
        const errorObj = {};
        // const urlArray = [prevImg, imgurl1, imgurl2, imgurl3, imgurl4];
        const fileTypes = ['.jpeg', '.png', '.jpg'];

        if (!address) errorObj['address'] = 'Address is required' ;
        if (!city) errorObj['city'] = 'City is required';
        if (!aState) errorObj['state'] = 'State is required';
        if (!country) errorObj['country'] = 'Country is required';
        if (!name) errorObj['name'] = 'Name is required';
        if (name.length > 50) errorObj['name'] = "Name can't be more than 50 characters long";
        if (!description) errorObj['description'] = 'Description is required';
        if (!description > 30) errorObj['description'] = 'Description needs 30 or more characters';
        if (!price) errorObj['price'] = 'Price per night is required';
        if (!prevImg) errorObj['prevImg'] = 'Preview image is required';


        if (!(fileTypes.some(type => {
            return prevImg.endsWith(type)}))) {
            errorObj['prevImg'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!(fileTypes.some(type => {return imgurl1.endsWith(type)})) && imgurl1.length) {
            errorObj['imgurl1'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!(fileTypes.some(type => {
            return imgurl2.endsWith(type)})) && imgurl2.length) {
            errorObj['imgurl2'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!(fileTypes.some(type => {
            return imgurl3.endsWith(type)})) && imgurl3.length) {
            errorObj['imgurl3'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!(fileTypes.some(type => {
            return imgurl4.endsWith(type)})) && imgurl4.length) {
            errorObj['imgurl4'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } 




        // for (let i = 0; i < urlArray.length; i++) {
        //     const url = urlArray[i];
            // if (fileTypes.some(type => {
            //     return url.endsWith(type)})) {
            //     errorObj[url] = 'Image URL must end in .png, .jpg, or .jpeg';
            // } 
        // }
        setErrors(errorObj);
        // if (!prevImg.endsWith('.png') || !prevImg.endsWith('.jpg') || !prevImg.endsWith('.jpeg')) {
        //         errorObj['prevImg'] = 'Image URL must end in .png, .jpg, or .jpeg';
        // } if (imgurl1.length && (!imgurl1.endsWith('.png') || !imgurl1.endsWith('.jpg') || !imgurl1.endsWith('.jpeg') || imgurl1.length < 5)) {
        //     errorObj['imgurl1'] = 'Image URL must end in .png, .jpg, or .jpeg';
        // } if (imgurl2.length && (!imgurl2.endsWith('.png') || !imgurl2.endsWith('.jpg') || !imgurl2.endsWith('.jpeg') || imgurl2.length < 5)) {
        //     errorObj['imgurl2'] = 'Image URL must end in .png, .jpg, or .jpeg';
        // } if (imgurl3.length && (!imgurl3.endsWith('.png') || !imgurl3.endsWith('.jpg') || !imgurl3.endsWith('.jpeg') || imgurl3.length < 5)) {
        //     errorObj['imgurl3'] = 'Image URL must end in .png, .jpg, or .jpeg';
        // } if (imgurl4.length && (!imgurl4.endsWith('.png') || !imgurl4.endsWith('.jpg') || !imgurl4.endsWith('.jpeg'))) {
        //     errorObj['imgurl4'] = 'Image URL must end in .png, .jpg, or .jpeg';
        // }

    }, [address, city, aState, country, name, description, price, prevImg, imgurl1, imgurl2, imgurl3, imgurl4])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorClass = document.querySelectorAll('.errors');
        // errorClass.forEach(one => one.classList.remove("hidden"));
        errorClass.forEach(one => one.removeAttribute("hidden"));

        // SpotForm().forceUpdate()
        // Object.assign(errorLog, errors);

        // console.log('log',errorLog);
        console.log('errors!',errors);

            let newSpot = {
                address, city, state: aState, country, lat: 1, lng: 1, name, description, price
            }

                newSpot = await dispatch(createSpot(newSpot))

            if (!('id' in  newSpot)) {
                return false
            } 
                // const noImgUrl = noUrl;
                // let images = [];
                //     {url: prevImg, preview: true}, 
                //     {url: imgurl1 || noImgUrl, preview: false}, 
                //     {url: imgurl2 || noImgUrl, preview: false}, 
                //     {url: imgurl3 || noImgUrl, preview: false}, 
                //     {url: imgurl4 || noImgUrl, preview: false}
                // ];
               
                let newImgPrev = {url: prevImg, preview: true, spotId: newSpot.id};
                let newImg1 = {url: imgurl1 || noImgUrl, preview: false, spotId: newSpot.id};
                let newImg2 = {url: imgurl2 || noImgUrl, preview: false, spotId: newSpot.id};
                let newImg3 = {url: imgurl3 || noImgUrl, preview: false, spotId: newSpot.id}; 
                let newImg4 = {url: imgurl4 || noImgUrl, preview: false, spotId: newSpot.id};

                
                newSpot.Owner = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName
                }

                // images.push(newImgPrev);
                // images.push(newImg1);
                // images.push(newImg2);
                // images.push(newImg3);
                // images.push(newImg4);

                // newSpot.SpotImages = images;
                
                dispatch(postImage(newImgPrev));
                dispatch(postImage(newImg1));
                dispatch(postImage(newImg2));
                dispatch(postImage(newImg3));
                dispatch(postImage(newImg4));

   
                history.push(`/spots/${newSpot.id}`);
            
    }



    return (
        <div className='outer'>
        <div className='inner'>
        <form id='display' onSubmit={handleSubmit}>
        <div className='borderBox'>
        <h1>Create a New Spot</h1>
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <label>Country
        <div id='country'>
            <input type='text' className='txtInput' 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder='country' 
                />
        </div>
        </label>
        <p className='errors' hidden>{errors.country}</p>

        <label>Address
        <div id='address'>
            <input type='text' className='txtInput' 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='address' />
        </div>
        </label>
        <p className='errors' hidden>{errors.address}</p>

    <div className='city-state'>
        <div id='city'>
            <label>City
            
                <input type='text' className='txtInput' 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='city' />
            
            </label></div>
            <p className='errors' hidden>{errors.city}</p>
            <div id='state'>
            <label>State
            
                <input type='text' className='txtInput' 
                    value={aState}
                    onChange={(e) => setAState(e.target.value)}
                    placeholder='STATE' />
            
            </label></div>
            <p className='errors' hidden>{errors.state}</p>
    </div>


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
            className='txtInput' 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="8" cols="65"
            placeholder='Please write at least 30 characters'
        />
        <p className='errors' hidden>{errors.description}</p>
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
        <p className='errors' hidden>{errors.name}</p>
        
        </div>

        <div className='borderBox'>
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div id='price'>
            <label><strong>$ </strong>
            <input type='number' 
                className='txtInput' 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Price per night (USD)' />
            </label>
        </div>
        <p className='errors' hidden>{errors.price}</p>
        </div>

        <div className='borderBox'>
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>


        <input type='text' className='txtInput'
            value={prevImg}
            onChange={(e) => setPrevImg(e.target.value)}
            placeholder='Preview Image URL' />
        <p className='errors' hidden>{errors.prevImg}</p>

            <input type='text' className='txtInput' 
                value={imgurl1}
                onChange={(e) => setImgurl1(e.target.value)}
                placeholder='Image URL' />
            <p className='errors' hidden>{errors.imgurl1}</p>
            <input type='text' className='txtInput' 
                value={imgurl2}
                onChange={(e) => setImgurl2(e.target.value)}
                placeholder='Image URL' />
            <p className='errors' hidden>{errors.imgurl2}</p>
            <input type='text' className='txtInput' 
                value={imgurl3}
                onChange={(e) => setImgurl3(e.target.value)}
                placeholder='Image URL' />
            <p className='errors' hidden>{errors.imgurl3}</p>
            <input type='text' className='txtInput' 
                value={imgurl4}
                onChange={(e) => setImgurl4(e.target.value)}
                placeholder='Image URL' />
            <p className='errors' hidden>{errors.imgurl4}</p>
            </div>

        <div>
        <input type='submit' id='createButton' value='Create Spot' />
        </div>
        </form>
        </div></div>

    )
}

export default SpotForm;