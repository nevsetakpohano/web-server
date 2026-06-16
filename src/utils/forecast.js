const request = require('request')
const config = require('../config')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + config.weatherstackToken + '&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (!body || body.error) {
            callback('Unable to find location', undefined)
        } else {
            const current = body.current
            const description = current.weather_descriptions[0] || 'No description available'
            callback(undefined, description + '. It is currently ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast
