const request = require('postman-request')

const geocode = (city, callback) => {
  try {
    const url = `${process.env.BASE_MAP_BOX_API}/${encodeURIComponent(city)}.json?access_token=${
      process.env.API_KEY_MAP_BOX
    }&limit=1`

    request({ url, json: true }, (error, response) => {
      console.log(error, response)
      if (error) {
        callback(error, undefined)
        return
      }

      if (response.body.message) {
        callback(response.body.message, undefined)
        return
      }

      if (!response.body.features) {
        callback('is empty features', undefined)
        return
      }

      const { center = [] } = response.body?.features?.[0]
      callback(undefined, { lat: center[1], lon: center[0], city })
    })
  } catch (e) {
    console.error(e)
  }
}

module.exports = geocode
