const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tiket = sequelize.define('Tiket', {
  nama: DataTypes.STRING,
  nik: DataTypes.STRING,
  kereta: DataTypes.STRING,
  kelas: DataTypes.STRING,
  stasiun_asal: DataTypes.STRING,
  stasiun_tujuan: DataTypes.STRING,
  tipe_perjalanan: DataTypes.STRING,
  tanggal_keberangkatan: DataTypes.DATEONLY,
  tanggal_pulang: DataTypes.DATEONLY,
  jumlah_penumpang: DataTypes.INTEGER,
  harga: DataTypes.INTEGER,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Belum Dibayar'
  },
  metode_pembayaran: DataTypes.STRING,
  userId: DataTypes.INTEGER
});

module.exports = Tiket;