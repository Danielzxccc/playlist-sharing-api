const client = require('../config/dbConfig')
const ErrorHandler = require('../helpers/errorHandler')
const fetchDetails = require('isomorphic-unfetch')
const { getData, getPreview, getTracks, getDetails } =
  require('spotify-url-info')(fetchDetails)

async function fetch() {
  try {
    const data = await client.select().from('playlist')
    return data
  } catch (error) {
    throw new ErrorHandler(error.message | "Can't Create playlist!", 403)
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

module.exports = { fetch, getInfo }
