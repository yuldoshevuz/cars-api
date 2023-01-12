const { Schema, model } = require('mongoose')

const CarsSchema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, require: true }
})

const Cars = model('Cars', CarsSchema)

module.exports = Cars