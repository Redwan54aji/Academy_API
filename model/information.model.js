const Joi = require('joi');
const {
    models
} = require('mongoose');
const mongoos = require('mongoose');


const informationSchema = new mongoos.Schema({
    track_title: {
        type: String,
        minlenght: 2,
        maxlenght: 1000,
        required: true,
        trim: true,
        enum: ["Front End", "Back End", "Ai", "Cyber Security"]
    },
    fist: {
        type: String,
        minlenght: 5,
        maxlenght: 1000,
        trim: true,
    },
    secound: {
        type: String,
        minlenght: 5,
        maxlenght: 1000,
        trim: true,
    },
    threed: {
        type: String,
        minlenght: 5,
        maxlenght: 1000,
        trim: true,
    },
    fourth: {
        type: String,
        minlenght: 5,
        maxlenght: 1000,
        trim: true,
    }

})

function vallidinformation(obj) {
    const schame = Joi.object({
        track_title: Joi.string().trim().min(5).max(1000).valid("Front End", "Back End", "Ai", "Cyber Security").required(),
        fist: Joi.string().trim().min(5).max(1000),
        secound: Joi.string().trim().min(5).max(1000),
        threed: Joi.string().trim().min(5).max(1000),
        fourths: Joi.string().trim().min(5).max(1000),

    })
    return schame.validate(obj)
}

function validateUpdateinformation(obj) {
    const schame = Joi.object({
        track_title: Joi.string().trim().min(5).max(1000).valid("Front End", "Back End", "Ai", "Cyber Security"),
        fist: Joi.string().trim().min(5).max(1000),
        secound: Joi.string().trim().min(5).max(1000),
        threed: Joi.string().trim().min(5).max(1000),
        fourths: Joi.string().trim().min(5).max(1000),
    });
    return schame.valid(obj)
}

const information = mongoos.model('information', informationSchema)

module.exports = {
    information,
    vallidinformation,validateUpdateinformation
}