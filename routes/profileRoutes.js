const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

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

// Tampilkan form edit profil
router.get('/profile/edit', (req, res) => {
  res.render('editProfile', {
    user: req.user,
    success_msg: req.flash('success_msg')[0] || '',
    error_msg: req.flash('error_msg')[0] || ''
  });
});

// Proses edit profil
router.post('/profile/edit', upload.single('profileImage'), async (req, res) => {
  try {
    const { name, email } = req.body;
    let updateData = { name, email };
    if (req.file) {
      updateData.profileImage = req.file.filename;
    }
    await User.update(updateData, { where: { id: req.user.id } });
    req.flash('success_msg', 'Profil berhasil diperbarui');
    res.redirect('/profile');
  } catch (err) {
    req.flash('error_msg', 'Gagal memperbarui profil');
    res.redirect('/profile/edit');
  }
});

// ...existing code...




// ...existing code...
module.exports = router;