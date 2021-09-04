const request = require('postman-request')

const forecast = (data, callback) => {
  const { lat, lon } = data

  const url = `${process.env.BASE_WEATGER_API}/current?access_key=${process.env.API_KEY}&query=${lat},${lon}&units=m`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(error, undefined)
      return
    }

    if (response.body.error) {
      callback(response.body.error, undefined)
      return
    }

    callback(undefined, response.body)
  })
}

module.exports = forecast
