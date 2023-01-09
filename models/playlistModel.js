const client = require('../config/dbConfig')
const ErrorHandler = require('../helpers/errorHandler')
const fetchDetails = require('isomorphic-unfetch')
const { getPreview } = require('spotify-url-info')(fetchDetails)

async function fetch() {
  try {
    const data = await client.select().from('playlist').orderBy('id', 'desc')
    return data
  } catch (error) {
    throw new ErrorHandler(error.message | "Can't Fetch playlist!", 403)
  }
}

async function getInfo(link) {
  try {
    const data = await getPreview(link)
    return data
  } catch (error) {
    throw new ErrorHandler(error.message | "Can't retrieve this playlist", 403)
  }
}

async function create(playlist) {
  try {
    const data = client.insert(playlist).into('playlist').returning('*')
    return data
  } catch (error) {
    throw new ErrorHandler(error.stack | "Can't create playlist", 403)
  }
}

module.exports = { fetch, getInfo, create }
