const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          firstName: user.firstName, 
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );

  const passUserCheck = (req, res, next) => {
    const { credential, password } = req.body;
    const errors = [];
    const err = new Error();
    err.message = "Validation error";
    err.statusCode = 400;

    if (!password) {
      errors.push("Password is required")
    } if (!credential) {
      errors.push("Email or username is required")  
    }

    if (!errors.length) return next();
    err.errors = errors;
    return next(err);
  }

  router.post(
    '/',
    passUserCheck,
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;
  
      const user = await User.unscoped().findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
  
      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        // const err = new Error('Login failed');
        // err.status = 401;
        // err.title = 'Login failed';
        // err.errors = { credential: 'The provided credentials were invalid.' };
        const err = new Error();
        err.message = 'Invalid credentials';
        err.statusCode = 401;
        return next(err);
      } 
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName, 
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

  //get current user's spots
router.get('/spots', 
// requireAuth, 
async (req, res, next) => {
  const { user } = req;
  // let spots = await Spot.findAll({where: {ownerId: user.id}});
  const myUser = await User.findByPk(user.id);
  const spots = await myUser.getSpots();

  const spotsCopy = spots.slice()
  let spotsArray = [];

  while (spotsCopy.length) {
    let currSpot = spotsCopy.splice(spotsCopy.length -1);
    let spots2 = await Spot.findByPk(currSpot[0].id);

    const reviewCount = await spots2.countReviews();
    const image = await spots2.getSpotImages({ attributes: ['url'], where: { preview: true }});

    const avg = await Review.sum('stars', { where: { spotId: spots2.id }});
    const avgStarRating = avg / reviewCount;

    currSpot.avgStarRating = avgStarRating;
    currSpot.previewImage = image;
    spotsArray.push(currSpot)
}

spotsArray = {Spots: spotsArray}//fix

res.json(spotsArray)

  // res.json(currSpot)

})

  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // router.use((err, req, res, next) => { //double check these errors
    
  //   res.json(err)
  // })


module.exports = router;