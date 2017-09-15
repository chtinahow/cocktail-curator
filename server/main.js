const express = require('express')
const bodyParser = require('body-parser')
const api = require('./cocktail-curator-api')

const app = express()
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  res.send('Cocktail API')
})

app.post('/filter', async (req, res) => {
  const ingredients = req.body
  const filteredDrinks = await api.filterDrinksByIngredients(ingredients)
  res.send(filteredDrinks)
})

app.get('/search/:name', async (req,res) => {
  const drinks = req.params.name
  const filteredDrinks = await api.getDrinksByName(drinks)
  res.send(filteredDrinks)
})

app.get('/drink/:id', async (req,res) => {
  const drinks = req.params.id
  const filteredDrinks = await api.getDrinkById(drinks)
  res.send(filteredDrinks)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
