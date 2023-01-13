const client = require('../config/dbConfig')
const ErrorHandler = require('../helpers/errorHandler')

async function fetch(id) {
  try {
    const data = await client
      .select()
      .from('comments')
      .where({ playlistid: id })
      .orderBy('id', 'desc')
    return data
  } catch (error) {
    throw new ErrorHandler(error.message | "Can't Fetch Comments!", 403)
  }
}

async function create(comment) {
  try {
    const data = await client.insert(comment).into('comments').returning('*')
    return data
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(error.message | "Can't Create This Comment!", 403)
  }
}

async function checkCommentType(id, type) {
  try {
    const data = await client('playlist')
      .where({ id: id })
      .increment(type === 'loved' ? 'likes' : 'dislike', 1)
    return 'Added Comment Successfully'
  } catch (error) {
    throw new ErrorHandler(error.message | "Can't Check Comment Type!", 403)
  }
}

module.exports = { fetch, create, checkCommentType }
