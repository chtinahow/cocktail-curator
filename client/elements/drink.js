const Tram = require('tram-one')
const html = Tram.html()

const imageStyle = `
  grid-area: image;
  width: 100%;
`

const ingredientsStyle = `
  grid-area: ingredients;
  text-align: center;
`

const titleStyle = `
  grid-area: title;
  text-align: center;
`

const instructionsStyle = `
  grid-area: instructions;
  text-align: block;
`

const gridStyle = `
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "image title"
    "image ingredients"
    "description description";
`

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
