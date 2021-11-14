const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function (app) {
    app.get('/', requireAuth, (req, res) => {
        res.send({ message: 'super secret code' })
    })

    app.post('/api/signup', Authentication.signup);
    app.post('/api/signin', requireSignin, Authentication.signin);

}