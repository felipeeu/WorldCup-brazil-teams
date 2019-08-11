const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cupSchema = new Schema({
    year: Number,
    players: Array,
    img: String,
    country:String
});
module.exports = mongoose.model('WorldCup', cupSchema);