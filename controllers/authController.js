const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

exports.getRegister = (req, res) => {
  res.render('auth/register');
};

exports.postRegister = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Silakan isi semua field' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Password tidak cocok' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password minimal 6 karakter' });
  }

  if (errors.length > 0) {
    return res.render('auth/register', { errors, name, email, password, password2 });
  }

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      errors.push({ msg: 'Email sudah terdaftar' });
      return res.render('auth/register', { errors, name, email, password, password2 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({ name, email, password: hashedPassword });

    req.flash('success_msg', 'Registrasi berhasil. Silakan login.');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('auth/register', { errors: [{ msg: 'Terjadi kesalahan' }], name, email, password, password2 });
  }
};

exports.getLogin = (req, res) => {
  res.render('auth/login');
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};


exports.logout = (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'Anda telah logout');
    res.redirect('/login');
  });
};