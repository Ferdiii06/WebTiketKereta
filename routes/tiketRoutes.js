const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const tiketController = require('../controllers/tiketController');

router.get('/', ensureAuthenticated, tiketController.getAllTiket);
router.get('/add', ensureAuthenticated, tiketController.getAddTiket);
router.post('/', ensureAuthenticated, tiketController.postTiket);
router.get('/:id', ensureAuthenticated, tiketController.getTiket);
router.get('/edit/:id', ensureAuthenticated, tiketController.getEditTiket);
router.post('/edit/:id', ensureAuthenticated, tiketController.updateTiket);
router.post('/delete/:id', ensureAuthenticated, tiketController.deleteTiket);
router.get('/bayar/:id', ensureAuthenticated, tiketController.getPembayaran);
router.post('/bayar/:id', ensureAuthenticated, tiketController.postPembayaran);



module.exports = router;