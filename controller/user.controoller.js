const asynchandler = require('express-async-handler');
const {
    User,
    validateRegisterUser,
    validateloginUser
} = require('../model/User.model');
const bcrypt = require('bcryptjs');
const {
    model,
    models
} = require('mongoose');

module.exports.registerUser = asynchandler(async (req, res) => {
    const {
        error
    } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    let user = await User.findOne({
        email: req.body.email
    });
    if (user) {
        return res.status(400).json({
            message: "User already registered"
        });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const auth = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        numberPhone: req.body.numberPhone,
    });

    const result = await auth.save();
    const {
        password,
        ...other
    } = result._doc;

    return res.status(200).json({
        ...other
    });
});

module.exports.loginUser = asynchandler(async (req, res) => {
    const {
        error
    } = validateloginUser(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    let user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(400).json({
            message: "invalid email or password"
        })
    }
    const isMathPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isMathPassword) {
        return res.status(400).json({
            message: "invalid email or password"
        })
    }
    return res.status(200).json({
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        numberPhone: user.numberPhone,
        isAdmin: user.isAdmin,

    });
})