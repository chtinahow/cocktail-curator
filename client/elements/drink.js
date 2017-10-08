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
  margin-top: 0px;
`

const instructionsStyle = `
  grid-area: instructions;
  text-align: justify;
  align-self: end;
`

const gridStyle = `
  display: grid;
  grid-template-columns: 49% 49%;
  grid-column-gap: 2%;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "image title"
    "image ingredients"
    "image instructions";
  height: 80%;
  overflow: hidden;
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
