const Joi = require('joi');
const mongoos = require('mongoose');
const joipasswordcomplexity = require('joi-password-complexity')
const userSchema = new mongoos.Schema({
    email: {
        type: String,
        require: true,
        minlenght: 5,
        maxlenght: 100,
        unique: true,
        trim: true,
    },
    firstname: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
        trim: true,

    },
    lastname: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 60,
        trim: true,
    },
    numberPhone: {
        type: Number,
        required: true,
        minlength: 4,
        maxlength: 20,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})


function validateRegisterUser(obj) {
    const schame = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        firstname: Joi.string().trim().min(4).max(20).required(),
        lastname: Joi.string().trim().min(4).max(20).required(),
        password: joipasswordcomplexity().required(),
        numberPhone: Joi.string().trim().min(4).max(20).required(),
    })
    return schame.validate(obj)
}

function validateloginUser(obj) {
    const schame = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: joipasswordcomplexity().required(),
    })
    return schame.validate(obj)
}

const User = mongoos.model('User', userSchema)

module.exports = {
    User,
    validateRegisterUser,
    validateloginUser
}