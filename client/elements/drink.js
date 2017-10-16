const Tram = require('tram-one')
const html = Tram.html()

const imageStyle = `
  grid-area: image;
  width: 20em;
  max-width: 100%;
  border-radius: 100%;
    margin: auto;
`

const ingredientStyle = `
  border: 1px solid #271604;
  border-radius: .5rem;
  padding: 0.25em 0.75em;
  margin: 0.25em;
  display: inline-block;
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
      <span style=${ingredientStyle}>
        ${ingredient.measure} : ${ingredient.name}
      </span>
    `
  })

  const ingredientsStyle = `
    grid-area: ingredients;
    max-width: 80%;
    margin: auto;
  `

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
