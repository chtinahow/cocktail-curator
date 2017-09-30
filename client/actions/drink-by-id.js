module.exports = {
  init: () => Object({drink: null, status: 'NOT_LOADED'}),
  fetchDrinkById: (state, id, actions) => {
    fetch(`http://localhost:3000/drink/${id}`)
      .then(data => data.json())
      .then((data) => {
        actions.setDrinkInfo(data)
      })
    return Object.assign({}, state, {status: 'LOADING'})
  },
  setDrinkInfo: (state, data) => Object.assign({}, state, {drink: data, status: 'LOADED'})
}