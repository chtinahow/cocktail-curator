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

const disabledButtonStyle = `
  ${buttonStyle}
  color: #58422b;
  border: 1px solid #58422b;
  cursor: default;
`

const comboStyle = `
  grid-area: combobox;
`

const selectedIngredientsStyle = `
  grid-area: selected-ingredients
`
const ingredientStyle = `
  border: 1px solid #271604;
  margin: 1rem;
  border-radius: .5rem;
  padding: 0.25em 0.75em;
  cursor: pointer;
  margin: 0.25em;
  display: inline-block;
`

const gridStyle = `
  display: grid;
  margin: auto;
  max-width: 80%;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-row-gap: 1em;
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
  const searchIngredients = getOrFetchAllIngredients(store, actions)
  const selectedIngredients = store.selectedIngredientsStore
  const ingredientsDOM = selectedIngredients.map((ingredient) => {
    const removeIngredient = () => actions.removeIngredient(ingredient)
    return html`
      <span onclick=${removeIngredient} style=${ingredientStyle}>
        ${ingredient} <span style='color:rgba(0,0,0,0.30)'> ✗ </span>
      </span>
    `
  })

  const onClickIngredients = () => {
    window.history.pushState({}, '', `/filter?ingredients=${selectedIngredients}&limit=30`)
  }

  const seachButtonStyle = selectedIngredients.length === 0 ? disabledButtonStyle : buttonStyle
  const searchButtonAction = selectedIngredients.length === 0 ? () => {} : onClickIngredients

  return html`
    <div>
      <header></header>
      <div style=${gridStyle}>
        ${searchIngredients}
        <div style=${selectedIngredientsStyle}>
          ${ingredientsDOM}
        </div>
        <button style=${seachButtonStyle} onclick=${searchButtonAction}>
          Search
        </button>
      </div>
    </div>
  `
}
