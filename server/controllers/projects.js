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

exports.getProjects = function (req, res, next) {
    const data = [{ title: 'Project 1', id: 0 }, { title: 'Project 2', id: 1 }, { title: 'Project 3', id: 2 }]
    return res.status(200).send(data)
}

//get project/s
//save project