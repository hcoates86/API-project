const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review } = require('../../db/models');

const router = express.Router();


//get all spots
router.get('/', async (req, res, next) => {
  //   const spots = await Spot.scope({
  //   method: ["forUser", id ]
  // }).findAll()
  const spots = await Spot.findAll( { raw: true})

  res.json(spots)
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


router.post('/', requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const spot = await Spot.create( )
  { address, city, state, country, lat, lng, name, description, price }

  // address
  // city
  // state
  // country
  // lat
  // lng
  // name
  // description
  // price
  res.statusCode = 201;

})

module.exports = router;