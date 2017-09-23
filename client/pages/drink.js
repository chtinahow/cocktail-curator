const Tram = require('tram-one')
const html = Tram.html({
  header: require('../elements/header'),
  drink: require('../elements/drink')
})

const getOrFetchDrinkDOM = (store, actions, params) => {
  switch (store.drinkStore.status) {
    case 'NOT_LOADED':
      actions.fetchDrinkById(params.drinkId)
      return 'fetching...'
    case 'LOADING':
      return 'loading...'
    case 'LOADED':
      if (store.drinkStore.drink.id !== params.drinkId) {
        actions.fetchDrinkById(params.drinkId)
        return 'fetching...'
      }
      return html`
        <drink
          image=${store.drinkStore.drink.image}
          name=${store.drinkStore.drink.name}
          ingredients=${store.drinkStore.drink.ingredients}
          instructions=${store.drinkStore.drink.instructions}>
        </drink>
      `
    default:
      return 'Error...'
  }
}

module.exports = (store, actions, params) => {
  const drinkDOM = getOrFetchDrinkDOM(store, actions, params)
  return html`
    <div>
      <header></header>
      ${drinkDOM}
    </div>
  `
}
