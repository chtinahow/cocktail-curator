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

  let drinkLists = []
  for(ingredientIndex in ingredients) {
    const fetchedDrinks = await cocktailAPI.searchByIngredient(ingredients[ingredientIndex])
    drinkLists.push(fetchedDrinks)
  }

  const hashWithNewDrinkAndIng = (drinkHash, drink, ingredient) => {
    if(drinkHash[drink.idDrink]) {
      const newIngredients = drinkHash[drink.idDrink].ingredients.concat(ingredient)
      const newDrink = Object.assign({}, drink, {ingredients: newIngredients})
      return Object.assign({}, drinkHash, {[drink.idDrink]: newDrink})
    }
    const drinkWithIngredients = Object.assign({}, drink, {ingredients: [ingredient]})
    return Object.assign({}, drinkHash, {[drink.idDrink]: drinkWithIngredients})
  }

  const finalDrinks = drinkLists.reduce((drinks, drinkList, ingredientIndex) => {
    return drinkList.reduce((drinkHash, drink) => {
      const allDrinks = Object.assign({}, drinks, drinkHash)
      return hashWithNewDrinkAndIng(allDrinks, drink, ingredients[ingredientIndex])
    }, {})
  }, {})

  const finalDrinkList = Object.keys(finalDrinks).map(idDrink => finalDrinks[idDrink])
  finalDrinkList.sort((drink1, drink2) => drink2.ingredients.length - drink1.ingredients.length)

  res.send(finalDrinkList)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
