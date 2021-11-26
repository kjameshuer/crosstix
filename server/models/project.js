const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    userId: String, // mongoose.ObjectId
    title: String,
    thumbnailUrl: { type: String, default: '' },
    projectColors: { type: [String], default: [] },
    colors: {},
    rows: { type: Number, default: 1 },
    columns: { type: Number, default: 1 },
    gridId: String,
    recentDate: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now }
});

const ModelClass = mongoose.model('project', projectSchema);

module.exports = ModelClass;