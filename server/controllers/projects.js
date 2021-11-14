const Project = require('../models/project');

exports.newProject = function (req, res, next) {
    const project = new Project();
    const title = (req.body.title) ? req.body.title : 'My Project';
    // can we get userId from server 
    const userId = (req.body.userId) ? req.body.userId : '2322332';
    //
    project.userId = userId;
    project.title = title;
    project.save();
    return res.status(200).send(project);
}

//get project/s
//save project