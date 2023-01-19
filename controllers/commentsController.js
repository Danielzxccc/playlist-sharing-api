const commentsModel = require('../models/commentsModel')

async function fetchComments(req, res) {
  try {
    const id = req.params.id
    const comments = await commentsModel.fetch(id)
    if (comments) res.status(200).json(comments)
  } catch (error) {
    res.status(error.httpCode).json({ error: true, message: error.message })
  }
}

async function createComment(req, res) {
  try {
    const data = req.body
    const id = req.body.playlistid
    const insert = await commentsModel.create(data)

    const { type } = insert[0]
    const checkComment = await commentsModel.checkCommentType(id, type)
    if (checkComment) res.status(201).json({ message: checkComment })
  } catch (error) {
    res.status(error.httpCode).json({ error: true, message: error.message })
  }
}

module.exports = { fetchComments, createComment }
