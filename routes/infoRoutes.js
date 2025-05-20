const express = require('express');
const router = express.Router();
const Info = require('../models/info');

router.get('/info', async (req, res) => {
  const infos = await Info.findAll({ order: [['valid_until', 'DESC']] });
  res.render('info', { infos });
});

module.exports = router;