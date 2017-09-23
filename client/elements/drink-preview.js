const Tram = require('tram-one')
const html = Tram.html()

module.exports = (attrs) => {
  const ingredientsDOM = attrs.ingredients
    .map(ingredient => ingredient.name)
    .join(', ')

  const onClickDrink = () => {
    window.history.pushState({}, '', `/drink/${attrs.id}`)
  }

  return html`
    <div>
      <button onclick=${onClickDrink}>${attrs.name}</button>
      <img src=${attrs.image}/>
      <h3>
        ${attrs.name}
      </h3>
      <div>
        includes: ${ingredientsDOM}, ...
      </div>
    </div>
  `
}
