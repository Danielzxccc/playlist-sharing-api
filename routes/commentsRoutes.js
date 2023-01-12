const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')

router.get('/get/:id', commentsController.fetchComments)
router.post('/create', commentsController.createComment)

module.exports = router
