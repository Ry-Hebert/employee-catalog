const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const employeeSchema = new Schema({
    id: Number,
    name: String,
    age: Number,
    gender: String,
    interests: String,
    address: String,
    groups: [String],
    favorite: Boolean,
    image: String
})

module.exports = Mongoose.model('employee', employeeSchema)
