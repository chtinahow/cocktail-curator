module.exports = {
  init: () => Object({drinks: null, ingredients: null, status: 'NOT_LOADED'}),
  fetchDrinksByIngredients: (state, ingredients, actions) => {
    const ingredientsCSV = Array.isArray(ingredients) ?
      ingredients.join(',') :
      ingredients
    const limit = window.location.href.match(/limit=(\d+)/)[1]
    fetch(`http://174.138.61.188/filter?ingredients=${ingredientsCSV}&limit=${limit}`)
      .then(data => data.json())
      .then((data) => {
        actions.setDrinks(data)
      })
    return Object.assign({}, state, {ingredients}, {status: 'LOADING'})
  },
  setDrinks: (state, data) => Object.assign({}, state, {drinks: data, status: 'LOADED'})
}
