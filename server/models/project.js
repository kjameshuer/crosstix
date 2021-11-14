const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    userId: String, // mongoose.ObjectId
    title: String,
    thumbnailUrl: { type: String, default: '' },
    projectColours: { type: [String], default: [] },
    colours: {},
    recentDate: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now }
});

const ModelClass = mongoose.model('project', projectSchema);

module.exports = ModelClass;