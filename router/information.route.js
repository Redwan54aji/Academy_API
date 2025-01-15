const express = require('express');
const {
    postTitle,
    getAllTitle,
    getTitleById,
    getTitleName,
    UpdateTitle,
    DeleteTitleById
} = require('../controller/information.controoller')

const router = express.Router();

router.post('/new', postTitle)
router.get('/', getAllTitle)
router.get('/:track_title', getTitleName)
router.get('/:id', getTitleById)
router.put('/:id', UpdateTitle)
router.delete('/:id', DeleteTitleById)

module.exports = router;