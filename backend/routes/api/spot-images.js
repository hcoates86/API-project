const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking } = require('../../db/models');

const router = express.Router();




router.delete('/:imageId', requireAuth, findSpot, properAuth, async (req, res, next) => {

    const image = await SpotImage.findByPk(req.params.imageId)
    const spot = await image.getSpot();
    if (!image) {
        const err = new Error("Spot Image couldn't be found")
        err.status = 404;
        err.title = "Spot Image couldn't be found";
        err.errors = { message:  "Spot Image couldn't be found"};
        next(err)
    }
    if (req.user.id !== spot.ownerId) {
        const err = new Error("Spot must belong to the current user")
        err.status = 401;
        err.title = "Authentication required";
        err.errors = { message:  "Spot must belong to the current user"};
        next(err)
    }

    await image.destroy()
    res.status(200)
    res.json("Successfully deleted")
  })






module.exports = router;