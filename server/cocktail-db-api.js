const fetch = require('node-fetch')
const cocktailKey = '5210'

const buildIngredientArray = (drink) => {
  return Object.keys(drink)
    .filter(key => key.match(/strIngredient\d+/))
    .filter(ingredientKey => drink[ingredientKey] !== '')
    .filter(ingredientKey => drink[ingredientKey] !== null)
    .map(ingredientKey => ingredientKey.replace('strIngredient', ''))
    .map((ingredientIndex) => {
      return {
        name: drink[`strIngredient${ingredientIndex}`],
        measure: drink[`strMeasure${ingredientIndex}`].trim()
      }
    })
}

const transformDrinkJSON = (drink) => {
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    instructions: drink.strInstructions,
    image: drink.strDrinkThumb,
    ingredients: buildIngredientArray(drink)
  }
}

const transformFilterDrinkJSON = (drink) => {
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    image: drink.strDrinkThumb
  }
}

module.exports = {
  // Search cocktail by name
  searchByName: async (name) => {
    const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/${cocktailKey}/search.php?s=${name}`)
    const drinkJSON = await response.json()
    const parsedDrinks = drinkJSON.drinks.map(drink => transformDrinkJSON(drink))
    return parsedDrinks
  },
  // Search by ingredient
  searchByIngredient: async (ingredient) => {
    const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/${cocktailKey}/filter.php?i=${ingredient}`)
    const drinkJSON = await response.json()
    const parsedDrinks = drinkJSON.drinks.map(drink => transformFilterDrinkJSON(drink))
    return parsedDrinks
  },
  // Get drink by id
  getByDrinkId: async (id) => {
    const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/${cocktailKey}/lookup.php?i=${id}`)
    const drinkJSON = await response.json()
    const parsedDrinks = drinkJSON.drinks.map(drink => transformDrinkJSON(drink))
    return parsedDrinks[0]
  },
  // Get all ingredients
  getAllIngredients: async () => {
    const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/${cocktailKey}/list.php?i=list`)
    const drinkJSON = await response.json()
    return drinkJSON
  },
  // Lookup a random cocktail
  getRandomDrink: async () => {
    const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/${cocktailKey}/random.php`)
    const drinkJSON = await response.json()
    const parsedDrinks = drinkJSON.drinks.map(drink => transformDrinkJSON(drink))
    return parsedDrinks[0]
    // http://www.thecocktaildb.com/api/json/v1/${cocktailKey}/random.php
  }
}
