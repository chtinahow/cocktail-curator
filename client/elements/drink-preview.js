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

const gridStyle = `
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "image title"
    "image ingredients";
`

const hoverStyle = html`
  <style>
    .drink-preview:hover {
      background: #ff9400;
      cursor: pointer;
    }
  </style>
`

module.exports = (attrs) => {
  const ingredientsDOM = attrs.ingredients
    .map(ingredient => ingredient.name)
    .join(', ')

  const onClickDrink = () => {
    window.history.pushState({}, '', `/drink/${attrs.id}`)
  }

  return html`
    <div onclick=${onClickDrink}>
      ${hoverStyle}
      <div class="drink-preview" style=${gridStyle}>
        <img src=${attrs.image} style=${imageStyle} />
        <h3 style=${titleStyle}>
          ${attrs.name}
        </h3>
        <div style=${ingredientsStyle}>
          includes: ${ingredientsDOM}, ...
        </div>
      </div>
    </div>
  `
}
