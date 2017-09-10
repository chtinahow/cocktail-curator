const express = require('express')
const bodyParser = require('body-parser')
const cocktailAPI = require('./cocktail-db-api')

const app = express()
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  const drink = await cocktailAPI.searchByName('Royal Gin Fizz')
  res.send(drink)
})

app.post('/filter', async (req, res) => {
  const ingredients = req.body

  let drinkArrays = []
  for(ingredientIndex in ingredients) {
    const fetchedDrinks = await cocktailAPI.searchByIngredient(ingredients[ingredientIndex])
    drinkArrays.push(fetchedDrinks)
  }

  const doesListHaveDrink = (drinkList, drink) => {
    return drinkList
      .map(listDrink => listDrink.idDrink)
      .includes(drink.idDrink)
  }

  const finalDrinks = drinkArrays[0].filter(drink => {
    return drinkArrays
      .slice(1)
      .map(drinkList => doesListHaveDrink(drinkList, drink))
      .every(listHasDrink => listHasDrink)
  })
  res.send(finalDrinks)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
