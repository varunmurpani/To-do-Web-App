const router = require('express').Router();
const passport = require('passport');
require('../config/passport-setup')

//login
router.get('/', (req, res) => {
    res.render('login', {user:req.user})
});

//logout
router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

//google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//google-redirect
router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/profile');
  }
);

module.exports = router;