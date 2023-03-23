const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const router = express.Router();


const reviewTotal = await Review.count();
const reviewStars = await Review.sum('stars');
const aveStars = reviewStars / reviewTotal;

router.get('/all', async (req, res, next) => {
  const spots = await Spot.findAll({
    
  })

})

router.get('/:ownerId', async (req, res, next) => {

  const user = await User.findByPk(req.params.ownerId)
  const spots = 


})


router.get('/:spotId', async (req, res, next) => {
  const id = req.params.spotId;
  const spots = await Spot.findByPk(id);
  const reviewCount = await Spot.countReviews();
  const images = await Spot.getSpotImages();
  const owner = await Spot.getUsers();

  res.json(spots, )
})