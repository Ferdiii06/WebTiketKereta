const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const authController = require('../controllers/authController');
const multer = require('multer');
const path = require('path');
const User = require('../models/User'); // Pastikan path benar

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Route upload foto profil
router.post('/profile/upload', upload.single('profileImage'), async (req, res) => {
  try {
    // Simpan nama file ke database user
    await User.update(
      { profileImage: req.file.filename },
      { where: { id: req.user.id } }
    );
    res.redirect('/profile');
  } catch (err) {
    res.status(500).send('Upload gagal');
  }
});
// Halaman beranda (dashboard utama)
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('beranda', { user: req.user });
  } else {
    res.redirect('/login');
  }
});

// Register
router.get('/register', forwardAuthenticated, authController.getRegister);
router.post('/register', authController.postRegister);

// Login
router.get('/login', forwardAuthenticated, authController.getLogin);
router.post('/login', authController.postLogin);

// Profil
router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('profile', { user: req.user });
});

// Logout
router.get('/logout', authController.logout);

module.exports = router;