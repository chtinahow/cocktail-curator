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
      return html`
        <drink
          image=${store.drinkStore.drink.image}
          name=${store.drinkStore.drink.name}
          ingredients=${store.drinkStore.drink.ingredients}
          instructions=${store.drinkStore.drink.instructions}>
        </drink>
      `
  }
}

module.exports = (store, actions, params) => {
  const drinkDOM = getOrFetchDrinkDOM(store, actions, params)
  return html`
    <div>
      <header></header>
      ${drinkDOM}
      <div>
        Thank you for using Tram-One!<br>
        To get started, edit <code>client/pages/home.js</code>.
      </div>
    </div>
  `
}
