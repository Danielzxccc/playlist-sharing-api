const express = require('express')
const router = express.Router()
const playlistController = require('../controllers/playlistController')

router.get('/get', playlistController.fetchPlaylist)
router.post('/info', playlistController.getPlaylistInfo)
router.post('/create', playlistController.createPlaylist)

module.exports = router
