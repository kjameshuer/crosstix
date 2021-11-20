const Project = require('../models/project');
const GridRow = require('../models/gridRow');

exports.newProject = function (req, res, next) {
    const project = new Project();
    const title = (req.body.title) ? req.body.title : 'My Project';

    project.userId = req.user._id.toString();
    project.title = title;
    project.save();
    return res.status(200).send(project);
}

exports.getProjects = function (req, res, next) {
    const userId = req.user._id.toString();

    Project.find({ userId: userId }, function (err, existingProjects) {
        if (err) { return next(err); }
        if (existingProjects.length === 0) {
            return res.status(200).send([])
        }

        return res.status(200).send(existingProjects)
    });
}

exports.getProject = function (req, res, next) {

    const projectId = req.query.projectId;
    Project.findOne({ _id: projectId }, function (err, project) {
        if (err) { return next(err); }
        console.log("project", project)
        return res.status(200).send(project);
    })
}

exports.saveProject = function (req, res, next) {
    console.log("request", req.body)
    const projectColors = req.body.projectColors;
    Project.findOneAndUpdate({ _id: req.body._id }, { projectColors: projectColors }, null, function (err, project) {
        if (err) { return next(err) }
        return res.status(200).send(project);
    })

    // const grid = req.body.grid;
    // const cols = req.body.cols;
    // const rows = req.body.rows;

    // for(let row = 1; row < rows; row++) {
    //     let columnLetter = '';
    //     if (col + baseNumberLetter > 90) {
    //         // double letter
    //         const firstLetter = String.fromCharCode((col / 26) - 1 + baseNumberLetter) 
    //         const secondLetter = String.fromCharCode((col % 26) + baseNumberLetter)
    //         columnLetter = `${firstLetter}${secondLetter}`;
    //     } else {
    //         // single letter
    //         columnLetter = String.fromCharCode(col + baseNumberLetter);
    //     }
        
    //     const key = `${columnLetter}${row}`
    //     griddy[key] = {
    //         color: cellColor,
    //         column: columnLetter,
    //         row
    //     }
    // }

    // GridRow
}

//get project/s
//save project