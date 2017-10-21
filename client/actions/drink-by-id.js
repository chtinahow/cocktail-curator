module.exports = {
  init: () => Object({drink: null, status: 'NOT_LOADED'}),
  fetchDrinkById: (state, id, actions) => {
    fetch(`http://174.138.61.:4696/drink/${id}`)
      .then(data => data.json())
      .then((data) => {
        actions.setDrinkInfo(data)
      })
    return Object.assign({}, state, {status: 'LOADING'})
  },
  setDrinkInfo: (state, data) => Object.assign({}, state, {drink: data, status: 'LOADED'})
}
