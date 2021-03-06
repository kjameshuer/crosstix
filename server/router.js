const Authentication = require('./controllers/authentication')
const Projects = require('./controllers/projects');
const passportService = require('./services/passport')
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function (app) {
    app.post('/api/signup', Authentication.signup);
    app.post('/api/signin', requireSignin, Authentication.signin);
    app.post('/api/project/new', requireAuth, Projects.newProject);
    app.get('/api/projects', requireAuth, Projects.getProjects);
    app.get('/api/project', requireAuth, Projects.getProject);
    app.post('/api/project/save', requireAuth, Projects.saveProject);
    app.post('/api/project/delete', requireAuth, Projects.deleteProject);
}