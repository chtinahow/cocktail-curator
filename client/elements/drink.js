const Tram = require('tram-one')
const html = Tram.html()

module.exports = (attrs) => {
  const ingredientsDOM = attrs.ingredients.map((ingredient) => {
    return html`
      <li>${ingredient.measure} : ${ingredient.name}</li>
    `
  })
  return html`
    <div>
      <img src=${attrs.image}/>
      <h3>
        ${attrs.name}
      </h3>
      <ul>
        ${ingredientsDOM}
      </ul>
      <div>
        ${attrs.instructions}
      </div>
    </div>
  `
}
