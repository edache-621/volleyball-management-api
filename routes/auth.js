const router = require('express').Router();
const passport = require('passport');

router.get(
    '/github',
    passport.authenticate('github', {
        scope: ['user:email']
    })
);

router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/auth/login'
    }),
    (req, res) => {
        res.redirect('/auth/profile');
    }
);

router.get('/login', (req, res) => {
    res.status(401).json({
        message: 'GitHub authentication failed.'
    });
});

router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            error: 'You must be logged in to view this page.'
        });
    }

    res.status(200).json({
        message: 'You are authenticated.',
        user: {
            id: req.user.id,
            username: req.user.username,
            displayName: req.user.displayName
        }
    });
});

router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }

        res.status(200).json({
            message: 'You have been logged out successfully.'
        });
    });
});

module.exports = router;
