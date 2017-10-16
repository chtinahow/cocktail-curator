const Tram = require('tram-one')
const html = Tram.html()

const imageStyle = `
  grid-area: image;
  width: 20em;
  border-radius: 100%;
    margin: auto;
`

const ingredientsStyle = `
  grid-area: ingredients;
  margin: auto;
`

const titleStyle = `
  grid-area: title;
  text-align: center;
  margin-top: 0px;
`

const instructionsStyle = `
  grid-area: instructions;
  text-align: justify;
  align-self: end;
  margin: auto;
`

const gridStyle = `
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-row-gap: 2em;
  grid-template-areas:
    "title"
    "image"
    "ingredients"
    "instructions";
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
      <h1 style=${titleStyle}>
        ${attrs.name}
      </h1>
      <ul style=${ingredientsStyle}>
        ${ingredientsDOM}
      </ul>
      <div style=${instructionsStyle}>
        ${attrs.instructions}
      </div>
    </div>
  `
}
