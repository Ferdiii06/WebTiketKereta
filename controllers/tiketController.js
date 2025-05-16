const Tiket = require('../models/Tiket');

exports.getPembayaran = async (req, res) => {
  const tiket = await Tiket.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!tiket) return res.redirect('/tiket');
  res.render('tiket/bayar', { tiket });
};

exports.postPembayaran = async (req, res) => {
  const { metode_pembayaran } = req.body;
  await Tiket.update(
    { metode_pembayaran, status: 'Dibayar' },
    { where: { id: req.params.id, userId: req.user.id } }
  );
  req.flash('success_msg', 'Pembayaran berhasil!');
  res.redirect('/tiket');
};

// Setelah pesan tiket, redirect ke pembayaran
exports.postTiket = async (req, res) => {
  try {
    const tiket = await Tiket.create({
      ...req.body,
      userId: req.user.id,
      status: 'Belum Dibayar'
    });
    res.redirect(`/tiket/bayar/${tiket.id}`);
  } catch (err) {
    req.flash('error_msg', 'Gagal memesan tiket');
    res.redirect('/tiket/add');
  }
};

// Halaman pembayaran
exports.getPembayaran = async (req, res) => {
  const tiket = await Tiket.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!tiket) return res.redirect('/tiket');
  res.render('tiket/bayar', { tiket });
};

// Proses pembayaran
exports.postPembayaran = async (req, res) => {
  const { metode_pembayaran } = req.body;
  await Tiket.update(
    { metode_pembayaran, status: 'Dibayar' },
    { where: { id: req.params.id, userId: req.user.id } }
  );
  req.flash('success_msg', 'Pembayaran berhasil!');
  res.redirect('/tiket');
};

// Tampilkan semua tiket milik user yang login
exports.getAllTiket = async (req, res) => {
  const tikets = await Tiket.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
  res.render('tiket/index', { tikets });
};

exports.getAddTiket = (req, res) => {
  res.render('tiket/add');
};

exports.postTiket = async (req, res) => {
  try {
    await Tiket.create({ ...req.body, userId: req.user.id });
    req.flash('success_msg', 'Tiket berhasil dipesan');
    res.redirect('/tiket');
  } catch (err) {
    req.flash('error_msg', 'Gagal memesan tiket');
    res.redirect('/tiket/add');
  }
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};
exports.getTiket = async (req, res) => {
  const tiket = await Tiket.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!tiket) return res.redirect('/tiket');
  res.render('tiket/detail', { tiket });
};

exports.getEditTiket = async (req, res) => {
  const tiket = await Tiket.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!tiket) return res.redirect('/tiket');
  res.render('tiket/edit', { tiket });
};

exports.updateTiket = async (req, res) => {
  await Tiket.update(req.body, { where: { id: req.params.id, userId: req.user.id } });
  req.flash('success_msg', 'Tiket berhasil diupdate');
  res.redirect('/tiket');
};

exports.deleteTiket = async (req, res) => {
  await Tiket.destroy({ where: { id: req.params.id, userId: req.user.id } });
  req.flash('success_msg', 'Tiket berhasil dihapus');
  res.redirect('/tiket');
};