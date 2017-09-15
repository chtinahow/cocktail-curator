const fetch = require('node-fetch')

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

const buildIngredientArray = (drink) => {
  return Object.keys(drink)
    .filter(key => key.match(/strIngredient\d+/))
    .filter(ingredientKey => drink[ingredientKey] !== '')
    .map(ingredientKey => ingredientKey.replace('strIngredient', ''))
    .map(ingredientIndex => {
      return {
        name: drink[`strIngredient${ingredientIndex}`],
        measure: drink[`strMeasure${ingredientIndex}`]
      }
    })
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
  searchByDrinkId: async (id) => {
    const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    const drinkJSON = await response.json()
    const parsedDrinks = drinkJSON.drinks.map(drink => transformDrinkJSON(drink))
    return parsedDrinks
  },
  // Get all ingredients
  getAllIngredients: () => {
    // http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
  },
  // Lookup full cocktail details by id
  getCocktailById: (id) => {
    // http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13060
  },
  // Lookup a random cocktail
  getRandomCocktail: () => {
    // http://www.thecocktaildb.com/api/json/v1/1/random.php
  }
}
