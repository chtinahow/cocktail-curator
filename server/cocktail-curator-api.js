const cocktailAPI = require('./cocktail-db-api')

module.exports = {
  getDrinkById: (drinkId) => {

  },

  filterDrinksByIngredients: async (ingredients) => {
    let drinkLists = []
    for(ingredientIndex in ingredients) {
      const fetchedDrinks = await cocktailAPI.searchByIngredient(ingredients[ingredientIndex])
      drinkLists.push(fetchedDrinks)
    }

    const hashWithNewDrinkAndIng = (drinkHash, drink, ingredient) => {
      if(drinkHash[drink.id]) {
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
        return hashWithNewDrinkAndIng(allDrinks, drink, ingredients[ingredientIndex])
      }, {})
    }, {})

    const finalDrinkList = Object.keys(finalDrinks).map(id => finalDrinks[id])
    finalDrinkList.sort((drink1, drink2) => drink2.ingredients.length - drink1.ingredients.length)

    return finalDrinkList
  },

  getDrinksByName: async (drinkName) => {
    const fetchedDrinks = await cocktailAPI.searchByName(drinkName)
    return fetchedDrinks
  }
}
