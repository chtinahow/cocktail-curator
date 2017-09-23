//const fetch = require('node-fetch')
// const HoverEngine = require('hover-engine')


const drinkActions = {
  init: () => Object({drink: null, status: 'NOT_LOADED'}),
  fetchRandomDrink: (state, _, actions) => {
    fetch('http://localhost:3000/randomDrink')
      .then(data => data.json())
      .then((data) => {
        actions.setDrinkInfo(data)
      })
    return Object.assign({}, state, {status: 'LOADING'})
  },
  setDrinkInfo: (state, data) => Object.assign({}, state, {drink: data, status: 'LOADED'})
}

const ingredientActions = {
  init: () => Object({ingredients: null, status: 'NOT_LOADED'}),
  fetchAllIngredients: (state, _, actions) => {
    fetch('http://localhost:3000/allIngredients')
      .then(data => data.json())
      .then((data) => {
        actions.setIngredients(data)
      })
    return Object.assign({}, state, {status: 'LOADING'})
  },
  setIngredients: (state, data) => Object.assign({}, state, {ingredients: data, status: 'LOADED'})
}

module.exports = {drinkActions, ingredientActions}

// const engine = new HoverEngine()
// engine.addListener((store) => console.log('SUBSCRIPTION:', JSON.stringify(store)))
// engine.addActions({drink: drinkActions})
// engine.addActions({ingredients: ingredientActions})
//
// engine.actions.fetchRandomDrink()
// engine.actions.fetchAllIngredients()
