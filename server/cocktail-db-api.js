const fetch = require('node-fetch')

const buildIngredientArray = (drink) => {
  return Object.keys(drink)
    .filter(key => key.match(/strIngredient\d+/))
    .filter(ingredientKey => drink[ingredientKey] !== '')
    .map(ingredientKey => ingredientKey.replace('strIngredient', ''))
    .map((ingredientIndex) => {
      return {
        name: drink[`strIngredient${ingredientIndex}`],
        measure: drink[`strMeasure${ingredientIndex}`]
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
    const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    const drinkJSON = await response.json()
    const parsedDrinks = drinkJSON.drinks.map(drink => transformDrinkJSON(drink))
    return parsedDrinks
  },
  // Search by ingredient
  searchByIngredient: async (ingredient) => {
    const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    const drinkJSON = await response.json()
    const parsedDrinks = drinkJSON.drinks.map(drink => transformFilterDrinkJSON(drink))
    return parsedDrinks
  },
  // Get drink by id
  getByDrinkId: async (id) => {
    const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    const drinkJSON = await response.json()
    const parsedDrinks = drinkJSON.drinks.map(drink => transformDrinkJSON(drink))
    return parsedDrinks[0]
  },
  // Get all ingredients
  getAllIngredients: async () => {
    const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    return response
  },
  // Lookup a random cocktail
  getRandomCocktail: async () => {
    const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php')
    const drinkJSON = await response.json()
    const parsedDrinks = drinkJSON.drinks.map(drink => transformDrinkJSON(drink))
    return parsedDrinks[0]
    // http://www.thecocktaildb.com/api/json/v1/1/random.php
  }
}
