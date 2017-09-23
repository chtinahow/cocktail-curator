const cocktailAPI = require('./cocktail-db-api')
const ingredientMapping = require('./ingredientMapping')
const urlencode = require('urlencode')

const expandIngredients = (reducedIngredients) => {
  return reducedIngredients.reduce((expandedIngredients, ingredient) => {
    if(ingredientMapping[ingredient]) {
      return expandedIngredients.concat(ingredientMapping[ingredient])
    }
    return expandedIngredients
  },[])
}

module.exports = {

  filterDrinksByIngredients: async (ingredients) => {
    const expandedIngredients = expandIngredients(ingredients)
    const drinkResults = expandedIngredients
      .map(ingredient => urlencode(ingredient))
      .map(cocktailAPI.searchByIngredient)
    const drinkLists = await Promise.all(drinkResults)

    const hashWithNewDrinkAndIng = (drinkHash, drink, ingredient) => {
      if (drinkHash[drink.id]) {
        const newIngredients = drinkHash[drink.id].ingredients.concat({name: ingredient})
        const newDrink = Object.assign({}, drink, {ingredients: newIngredients})
        return Object.assign({}, drinkHash, {[drink.id]: newDrink})
      }
      const drinkWithIngredients = Object.assign({}, drink, {ingredients: [{name: ingredient}]})
      return Object.assign({}, drinkHash, {[drink.id]: drinkWithIngredients})
    }

    const finalDrinks = drinkLists.reduce((drinks, drinkList, ingredientIndex) => {
      return drinkList.reduce((drinkHash, drink) => {
        const allDrinks = Object.assign({}, drinks, drinkHash)
        return hashWithNewDrinkAndIng(allDrinks, drink, expandedIngredients[ingredientIndex])
      }, {})
    }, {})

    const finalDrinkList = Object.keys(finalDrinks).map(id => finalDrinks[id])
    finalDrinkList.sort((drink1, drink2) => drink2.ingredients.length - drink1.ingredients.length)

    return finalDrinkList
  },

  getDrinksByName: async (drinkName) => {
    const fetchedDrinks = await cocktailAPI.searchByName(drinkName)
    return fetchedDrinks
  },

  getDrinkById: async (drinkId) => {
    const fetchedDrinks = await cocktailAPI.getByDrinkId(drinkId)
    return fetchedDrinks
  },

  getRandomDrink: async () => {
    const fetchedDrinks = await cocktailAPI.getRandomDrink()
    return fetchedDrinks
  },

  getReducedIngredients: () => Object.keys(ingredientMapping)
}
