module.exports = {
  init: () => Object({drinks: null, ingredients: null, status: 'NOT_LOADED'}),
  fetchDrinksByIngredients: (state, ingredients, actions) => {
    const ingredientsCSV = Array.isArray(ingredients) ?
      ingredients.join(',') :
      ingredients
    fetch(`http://localhost:3000/filter?ingredients=${ingredientsCSV}`)
      .then(data => data.json())
      .then((data) => {
        actions.setDrinks(data)
      })
    return Object.assign({}, state, {ingredients}, {status: 'LOADING'})
  },
  setDrinks: (state, data) => Object.assign({}, state, {drinks: data, status: 'LOADED'})
}
