const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
require('dotenv').config()

const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 8080

// Define path for express config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Yuriy Grishchenko',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Yuriy Grishchenko',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    message: 'Can i help you?',
    name: 'Yuriy Grishchenko',
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Yuriy Grishchenko',
    errorMessage: 'Help article not found',
  })
})

app.get('/weather', (req, res) => {
  const { address } = req.query

  if (!address) {
    res.send({
      error: 'Address is required field',
    })
  }

  geocode(address, (error, data = {}) => {
    if (error) {
      res.send({ error })
      return
    }

    forecast(data, (error, data = {}) => {
      if (error) {
        res.send({ error })
        return
      }

      const { temperature, feelslike, weather_descriptions = [] } = data.current
      const { region } = data.location
      const descriptionWeather = weather_descriptions.join(', ')

      res.send({
        message: `In ${region} currently ${temperature} degrees out. There is a feels like ${feelslike} degrees out. Description: ${descriptionWeather}`,
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Yuriy Grishchenko',
    errorMessage: 'Page not found',
  })
})

app.listen(port, () => {
  console.log(`Port ${port}`)
})
