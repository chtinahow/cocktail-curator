const express = require('express')
const cocktailAPI = require('./cocktail-db-api')

const app = express()

app.get('/', async (req, res) => {
  const drink = await cocktailAPI.searchByName('Royal Gin Fizz')
  res.send(drink)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
