const asynchandler = require('express-async-handler');
const {
    vallidinformation,
    validateUpdateinformation,
    information
} = require('../model/information.model');

module.exports.postTitle = asynchandler(async (req, res) => {
    const {
        error
    } = vallidinformation(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    const newTitle = new information({
        track_title: req.body.track_title,
        fist: req.body.fist,
        secound: req.body.secound,
        threed: req.body.threed,
        fourth: req.body.fourth,
    })
    const newinformation = await newTitle.save();
    return res.status(200).json({
        newinformation
    })
})


module.exports.getAllTitle = asynchandler(async (req, res) => {
    const getAll = await information.find();
    return res.status(200).json({
        getAll
    })
})


module.exports.getTitleName = asynchandler(async (req, res) => {
    const TitleByName = await information.find({
        track_title: req.params.track_title
    });
    if (TitleByName) {
        res.status(200).json(TitleByName);
    } else {
        res.status(404).json({
            message: "Title not found"
        });
    }
});

module.exports.getTitleById = asynchandler(async (req, res) => {
    const TitleById = await information.findById(req.params.id)
    if (TitleById) {
        res.status(200).json(TitleById)
    } else {
        res.status(404).json({
            message: "  Title not found"
        })
    }
})


module.exports.UpdateTitle = asynchandler(async (req, res) => {
    const {
        err
    } = validateUpdateinformation(req.body);
    if (err) {
        res.status(400).json({
            message: err.details[0].message
        })
    }
    const UpdateTitle = await information.findByIdAndUpdate(req.params.id, {
        $set: {
            track_title: req.body.track_title,
            fist: req.body.fist,
            secound: req.body.secound,
            threed: req.body.threed,
            fourth: req.body.fourth,
        }
    }, {
        new: true
    })
    return res.status(200).json(UpdateTitle)
})

module.exports.DeleteTitleById = asynchandler(async (req, res) => {
    const DeleteTitleById = await information.findByIdAndDelete(req.params.id)
    if (DeleteTitleById) {
        res.status(200).json({
            message: "title has  been deleted"
        })
    } else {
        res.status(404).json({
            message: "Title not found"
        })
    }
})