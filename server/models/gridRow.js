const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gridRowSchema = new Schema({
    projectId: String, // mongoose.ObjectId
    rowNumber: Number,
    row: {}
});

const ModelClass = mongoose.model('gridRow', gridRowSchema);

module.exports = ModelClass;