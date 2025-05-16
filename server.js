const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport');
require('dotenv').config();

const sequelize = require('./config/db');
const tiketRoutes = require('./routes/tiketRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
require('./config/passport')(passport);

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Set view engine
app.set('view engine', 'ejs');

// Flash message middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg') || '';
  res.locals.error_msg = req.flash('error_msg') || '';
  res.locals.user = req.user || null;
  next();
});

// Static uploads
app.use('/uploads', express.static('public/uploads'));

// ROUTES (setelah semua middleware di atas)
app.use('/', authRoutes);
app.use('/tiket', tiketRoutes);
app.use('/', profileRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});