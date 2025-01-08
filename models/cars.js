const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    hp: Number,
    image: String
});

const Car = mongoose.model('Car', carSchema, 'list');

module.exports = Car;