/* eslint-disable */
const got = require('got')
const metascraper = require('metascraper')([require('metascraper-title')()])

const baseRes = {
  headers: {
    'content-type': 'application/json'
  }
}

exports.handler = async function(event, context) {
  const query = event.queryStringParameters
  if (query === null || typeof query.url !== 'string') {
    return {
      ...baseRes,
      statusCode: 400,
      body: 'Missing URL query parameter'
    }
  }

  try {
    const { body: html, url } = await got(query.url, {
      timeout: 3000
    })
    const metadata = await metascraper({ html, url })
    if (typeof metadata.title !== 'string') {
      return {
        ...baseRes,
        statusCode: 400,
        body: JSON.stringify({ msg: 'Invalid URL!' })
      }
    }
    return {
      ...baseRes,
      statusCode: 200,
      body: JSON.stringify(metadata)
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      ...baseRes,
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
