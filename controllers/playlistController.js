const playlistModel = require('../models/playlistModel')

async function fetchPlaylist(req, res) {
  try {
    const pageNumber = req.query.page || 1
    const recordsPerPage = req.query.per_page || 9
    const offset = (pageNumber - 1) * recordsPerPage
    const searchQuery = req.query.search || ''

    const playlists = await playlistModel.fetch(
      pageNumber,
      offset,
      recordsPerPage,
      searchQuery
    )
    if (playlists) res.status(200).json(playlists)
  } catch (error) {
    res.status(error.httpCode).json({ error: true, message: error.message })
  }
}

async function fetchPlaylistDetails(req, res) {
  const id = req.params.id
  try {
    const playlist = await playlistModel.findOne(id)
    if (!playlist.length) res.status(404).json({ message: 'Not Found' })
    res.status(200).json(playlist)
  } catch (error) {
    res.status(error.httpCode).json({ error: true, message: error.message })
  }
}

async function getPlaylistInfo(req, res) {
  try {
    const playlistLink = req.body.link
    const data = await playlistModel.getInfo(playlistLink)
    if (data) res.status(200).json(data)
  } catch (error) {
    res
      .status(error.httpCode)
      .json({ error: error.message, message: error.message })
  }
}

async function createPlaylist(req, res) {
  try {
    const data = req.body
    const insert = await playlistModel.create(data)
    if (insert) res.status(201).json(insert)
  } catch (error) {
    res
      .status(error.httpCode)
      .json({ error: error.message, message: error.message })
  }
}

async function fetchTopPlaylist(req, res) {
  try {
    const { type } = req.body
    const data = await playlistModel.fetchTop(type)
    if (data) res.status(200).json(data)
  } catch (error) {
    res.status(403).json({ error: error, message: error.message })
  }
}
module.exports = {
  fetchPlaylist,
  fetchPlaylistDetails,
  getPlaylistInfo,
  createPlaylist,
  fetchTopPlaylist,
}
