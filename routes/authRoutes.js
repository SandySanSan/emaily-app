const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        // logout() is attached automatically to the req object by passport
        // takes the cookie that contains the user's id and kills the id that's in there
        req.logout();
        res.send(req.user);
    });
    // req > incoming request
    // res > outgoing response
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
