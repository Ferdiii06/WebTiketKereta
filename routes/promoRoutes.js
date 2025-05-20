const express = require('express');
const router = express.Router();
const Promo = require('../models/promo');

router.get('/promo', async (req, res) => {
  const promos = await Promo.findAll({ order: [['valid_until', 'DESC']] });
  res.render('tiket/promo', { promos });
});

module.exports = router;