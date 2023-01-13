const client = require('../config/dbConfig')
const ErrorHandler = require('../helpers/errorHandler')
const fetchDetails = require('isomorphic-unfetch')
const { getPreview } = require('spotify-url-info')(fetchDetails)

async function fetch(pageNumber, offset, recordsPerPage, search) {
  try {
    const data = await client('playlist')
      .where('title', 'ilike', `${search}%`)
      .orWhere('sentby', 'ilike', `${search}%`)
      .orWhere('description', 'ilike', `${search}%`)
      .orderBy('id', 'desc')
      .offset(offset)
      .limit(recordsPerPage)
    const total_records = await client('playlist').count('* as total')
    const totalPages = Math.ceil(total_records[0].total / recordsPerPage)
    return {
      playlist: data,
      pagination: {
        page: pageNumber,
        per_page: recordsPerPage,
        total_pages: totalPages,
        total_records: data.length,
      },
    }
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(error.message | "Can't Fetch playlist!", 403)
  }
}

async function findOne(id) {
  try {
    const data = await client.select().from('playlist').where({ id: id })
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
    console.log(error)
    throw new ErrorHandler(error.stack | "Can't create playlist", 403)
  }
}

module.exports = { fetch, findOne, getInfo, create }
