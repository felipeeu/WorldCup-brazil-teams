const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    position: String,
    img: String,
    cup: Number
});
module.exports = mongoose.model('Player', playerSchema);