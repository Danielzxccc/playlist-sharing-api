const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')

const rateLimit = require('express-rate-limit')

const createCommentLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 2, // Limit each IP to 3 create account requests per `window` (here, per hour)
  message:
    'Too many comments created from this IP, please try again after a minute',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

router.get('/get/:id', commentsController.fetchComments)
router.post('/create', createCommentLimiter, commentsController.createComment)

module.exports = router
