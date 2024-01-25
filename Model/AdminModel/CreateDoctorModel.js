const mongoose = require("mongoose");
const EmployeesSchema = mongoose.Schema({

    
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    degrees: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    specialist: {
        type: String,
        required: true,
    },
    doctorExperience:{
        type: String,
        required: true,
    },
    servicePlace:{
        type: String,
        required: true,
    },
    birthDate:{
        type: String,
        required: true,
    },
    phoneNo:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    bloodGroup:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    aboutMe:{
        type: String,
        required: true,
    },
    picture:{
        type: String,
        required: true,
    },

},{timestamps: true})

module.exports = mongoose.model('employees', EmployeesSchema);