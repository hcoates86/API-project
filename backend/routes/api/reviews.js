const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage } = require('../../db/models');

const router = express.Router();








module.exports = router;