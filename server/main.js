const express = require('express')
const cors = require('cors')
const api = require('./cocktail-curator-api')

const app = express()
app.use(cors())

app.get('/', async (req, res) => {
  res.send('Cocktail API')
})

app.get('/filter', async (req, res) => {
  if (req.query.ingredients === undefined) {
    res.status(400).send('¡No ingredientes!')
    return
  }
  const ingredients = req.query.ingredients.split(',')
  const filteredDrinks = await api.filterDrinksByIngredients(ingredients)
  const limitFilteredDrinks = filteredDrinks.slice(0, parseInt(req.query.limit, 10) || -1)
  res.send(limitFilteredDrinks)
})

app.get('/search/:name', async (req, res) => {
  const drinks = req.params.name
  const filteredDrinks = await api.getDrinksByName(drinks)
  res.send(filteredDrinks)
})

app.get('/drink/:id', async (req, res) => {
  const drinks = req.params.id
  const filteredDrinks = await api.getDrinkById(drinks)
  res.send(filteredDrinks)
})

app.get('/allIngredients', async (req, res) => {
  const ingredients = await api.getReducedIngredients()
  res.send(ingredients)
})

app.get('/randomDrink', async (req, res) => {
  const drink = await api.getRandomDrink()
  res.send(drink)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
