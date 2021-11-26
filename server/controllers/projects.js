const Project = require('../models/project');
const mongoose = require('mongoose');
var stream = require('stream');

const GRIDFS_CHUNK_SIZE = 1024
const GRIDFS_BUCKET_NAME = 'gridBucket'

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

        const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
            chunkSizeBytes: GRIDFS_CHUNK_SIZE,
            bucketName: GRIDFS_BUCKET_NAME
        });
        
        if (!project.gridId) return res.status(200).send({project, gridData:{}}) 

        let gridBuffer = new Buffer('');
    
        const readStream = gridFSBucket.openDownloadStreamByName(`projectGrid-${projectId}.txt`)
            
        readStream.on('data', (chunk) => {
            gridBuffer = Buffer.concat([gridBuffer, chunk]);
        })
    
        readStream.on('error', (error)=>{
            return res.send(error);
        })
    
        readStream.on('end', ()=>{
            const gridData = JSON.parse(gridBuffer.toString());
            gridBuffer = null; 
            readStream.destroy();  
            return res.status(200).send({project, gridData});
        });      
    })      
}
exports.deleteProject = function (req,res,next){
    Project.deleteOne({_id: req.body.id}, function (err){
        if (err) {return next(err)}
        return res.status(200).send({status: 'ok', id:req.body.id})
    })
}
exports.saveProject = function (req, res, next) {
    const projectColors = req.body.projectColors;
    const rows = req.body.rows;
    const columns = req.body.columns;
    const projectId = req.body.projectId;
    const grid = req.body.grid;

    const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
        chunkSizeBytes: GRIDFS_CHUNK_SIZE,
        bucketName: GRIDFS_BUCKET_NAME
    });

    const gridDataStream = new stream.Readable();
    gridDataStream.push(JSON.stringify(grid));
    gridDataStream.push(null); // Push null to end stream

    gridDataStream.pipe(gridFSBucket.openUploadStream(`projectGrid-${projectId}.txt`))
    .on('error', (error)=>{
        return res.send(error);
    })
    .on('finish', (data)=>{      
        Project.findOneAndUpdate(
            { _id: projectId }, 
            { $set: {
                recentDate: Date.now(), 
                projectColors: projectColors, 
                rows: rows, 
                columns: columns,
                gridId: data._id 
            }}, 
            null, 
            function (err, project) {
                if (err) { return next(err) }
                return res.status(200).send(project);
            }
        )
    });
}
