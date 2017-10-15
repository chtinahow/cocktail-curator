const Tram = require('tram-one')
const html = Tram.html({
  header: require('../elements/header'),
  'select-ingredients': require('../elements/select-ingredients')
})

const buttonStyle = `
  grid-area: button;
  border: 1px solid #271604;
  border-radius: .5rem;
  font-size: 1em;
  padding: 0.25em 0.75em;
  cursor: pointer;
  margin: 0.75rem;
  font-family: inherit;
  background: #e78900;
`
const comboStyle = `
  grid-area: combobox;
`

const selectedIngredientsStyle = `
  grid-area: selected-ingredients
`

const gridStyle = `
  display: grid;
  margin: auto;
  max-width: 80%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "combobox"
    "selected-ingredients"
    "button";
`

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
          style=${comboStyle}
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
  const selectedIngredients = store.selectedIngredientsStore
  const ingredientsDOM = selectedIngredients.map((ingredient) => {
    return html`
      <div>
        ${ingredient}
      </div>
    `
  })

  const onClickIngredients = () => {
    window.history.pushState({}, '', `/filter?ingredients=${selectedIngredients}&limit=30`)
  }
  return html`
    <div>
      <header></header>
      <div style=${gridStyle}>
        ${ingredients}
        <div style=${selectedIngredientsStyle}>
          ${ingredientsDOM}
        </div>
        <button style=${buttonStyle} onclick=${onClickIngredients}>
          Search
        </button>
      </div>
    </div>
  `
}
