const Tram = require('tram-one')
const html = Tram.html({
  header: require('../elements/header'),
  'drink-preview': require('../elements/drink-preview')
})

const bodyStyle = `
  padding: 0.8rem;
`

const getOrFetchDrinkDOM = (store, actions, params) => {
  switch (store.filterStore.status) {
    case 'NOT_LOADED':
      actions.fetchDrinksByIngredients(params.ingredients)
      return 'fetching...'
    case 'LOADING':
      return 'loading...'
    case 'LOADED':
      if (store.filterStore.ingredients !== params.ingredients) {
        actions.fetchDrinksByIngredients(params.ingredients)
        return 'fetching...'
      }
      return store.filterStore.drinks.map((drink) => {
        return html`
          <drink-preview
            id=${drink.id}
            image=${drink.image}
            name=${drink.name}
            ingredients=${drink.ingredients}
          >
          </drink-preview>
        `
      })
    default:
      return 'Error ...'
  }
}

module.exports = (store, actions, params) => {
  const drinkDOM = getOrFetchDrinkDOM(store, actions, params)
  return html`
    <div>
      <header></header>
      <div style=${bodyStyle}>
        ${drinkDOM}
      </div>
    </div>
  `
}
