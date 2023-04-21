const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review } = require('../../db/models');

const router = express.Router();


//get all spots
router.get('/', async (req, res, next) => {

  const spots = await Spot.findAll({raw: true})
  const spotsArray = [];

  for (let spot of spots) {
    let avgStarRating;
    const currSpot = await Spot.findByPk(spot.id);
    const reviewCount = await currSpot.countReviews();
    if (!reviewCount) { 
       avgStarRating = 'No reviews yet'
    } else {
      const avg = await Review.sum('stars', { where: { spotId: spot.id }});
       avgStarRating = avg / reviewCount;
    }
    let image = await currSpot.getSpotImages({ attributes: ['url'], where: { preview: true }})
    if (!image || !image.length) image = 'No preview image';

    spot.avgRating = avgStarRating;
    spot.previewImage = image[0].url || image;
    
    spotsArray.push(spot)
  }

  res.json({Spots: spotsArray})
})




router.get('/:spotId', async (req, res, next) => {
  const id = req.params.spotId;
  const spots = await Spot.findByPk(id);

  if (!spots) {
    const err = new Error();
    err.statusCode = 404;
    err.message = "Spot couldn't be found";
    // err.title = "Spot couldn't be found";
    return res.json(err)
  }

  const reviewCount = await spots.countReviews();
  const images = await spots.getSpotImages({ attributes: ['id', 'url', 'preview']});
  const owner = await spots.getUser({ attributes: ['id', 'firstName', 'lastName']});
  
  const avg = await Review.sum('stars', { where: { spotId: id}});
  const avgStarRating = avg / reviewCount;

  let spotsCopy = {...spots}

  let spots2 = spotsCopy.dataValues;
  
  spots2.numReviews = reviewCount;
  spots2.avgStarRating = avgStarRating;
  spots2.SpotImages = images;
  spots2.Owner = owner;

  res.json(spots2)
})

// router.post('/new', requireAuth, async (req, res, next) => {



// })


router.post('/new', requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const errors = [];
  const err = new Error();
  err.message = "Validation Error";
  err.statusCode = 400;
  if (!name) errors.push("Name is required");
  else if (name.length > 50) errors.push("Name must be less than 50 characters");
  if (!address) errors.push("Street address is required");
  if (!city) errors.push("City is required");
  if (!state) errors.push("State is required");
  if (!country) errors.push("Country is required");
  if (!lat || typeof lat !== 'number') errors.push("Latitude is not valid");
  if (!lng || typeof lng !== 'number') errors.push("Longitude is not valid");
  if (!description) errors.push("Description is required");
  if (!price) errors.push("Price per day is required");
  if (errors.length) {
    err.errors = errors;
    next(err)
  }
  const spot = await Spot.create({ 
    ownerId: req.user.id, //makes current user the owner id
    address, city, state, country, lat, lng, name, description, price })

  res.statusCode = 201;
  res.json(spot)
//should it allow multiple posts for the same spot?
})

module.exports = router;