module.exports = {
  init: () => Object({ingredients: null, status: 'NOT_LOADED'}),
  fetchAllIngredients: (state, _, actions) => {
    fetch(`http://174.138.61.188:4696/allIngredients`)
      .then(data => data.json())
      .then((data) => {
        actions.setAllIngredients(data)
      })
    return Object.assign({}, state, {status: 'LOADING'})
  },
  setAllIngredients: (state, data) => Object.assign({}, state, {ingredients: data, status: 'LOADED'})
}
