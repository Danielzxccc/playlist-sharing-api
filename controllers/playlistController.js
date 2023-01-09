const playlistModel = require('../models/playlistModel')

async function fetchPlaylist(req, res) {
  try {
    const playlists = await playlistModel.fetch()
    if (playlists) res.status(200).json(playlists)
  } catch (error) {
    res.status(403).json({ error: true, message: "Can't retrieve playlists" })
  }
}

async function getPlaylistInfo(req, res) {
  try {
    const playlistLink = req.body.link
    const data = await playlistModel.getInfo(playlistLink)
    if (data) res.status(200).json(data)
  } catch (error) {
    res
      .status(403)
      .json({ error: true, message: "Can't retrieve this playlist" })
  }
}

async function createPlaylist(req, res) {
  try {
    const data = req.body
    const insert = await playlistModel.create(data)
    if (insert) res.status(201).json(data)
  } catch (error) {
    // console.log(error.stack)
    res.status(403).json({ error: true, message: "Can't create playlist" })
  }
}
module.exports = { fetchPlaylist, getPlaylistInfo, createPlaylist }
