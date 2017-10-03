const Tram = require('tram-one')
const html = Tram.html()

const imageStyle = `
  grid-area: image;
  width: 100%;
`

const ingredientsStyle = `
  grid-area: ingredients;
  margin: auto;
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
    "instructions instructions";
`

module.exports = (attrs) => {
  const ingredientsDOM = attrs.ingredients.map((ingredient) => {
    return html`
      <li>${ingredient.measure} : ${ingredient.name}</li>
    `
  })
  return html`
    <div style=${gridStyle}>
      <img src=${attrs.image} style=${imageStyle}/>
      <h3 style=${titleStyle}>
        ${attrs.name}
      </h3>
      <ul style=${ingredientsStyle}>
        ${ingredientsDOM}
      </ul>
      <div style=${instructionsStyle}>
        ${attrs.instructions}
      </div>
    </div>
  `
}
