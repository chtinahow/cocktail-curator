const Tram = require('tram-one')
const html = Tram.html({
  header: require('../elements/header'),
  'select-ingredients': require('../elements/select-ingredients')
})

const getOrFetchAllIngredients = (store, actions) => {
  const addIngredient = (ingredient) => {
    actions.addIngredient(ingredient)
  }
  switch (store.ingredientsStore.status) {
    case 'NOT_LOADED':
      actions.fetchAllIngredients()
      return 'fetching...'
    case 'LOADING':
      return 'loading...'
    case 'LOADED':
      return html`
        <select-ingredients
          ingredients=${store.ingredientsStore.ingredients}
          onAddIngredient=${addIngredient}>
        </select-ingredients>
      `
    default:
      return 'Error...'
  }
}

module.exports = (store, actions) => {
  const ingredients = getOrFetchAllIngredients(store, actions)
  return html`
    <div>
      <header></header>
      ${ingredients}
      <div>
        Thank you for using Tram-One!<br>
        To get started, edit <code>client/pages/home.js</code>.
      </div>
    </div>
  `
}
