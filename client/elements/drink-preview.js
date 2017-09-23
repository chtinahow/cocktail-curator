const Tram = require('tram-one')
const html = Tram.html()

const imageStyle = `
  width: 10em;
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
      <div class="drink-preview">
        <img src=${attrs.image} style=${imageStyle} />
        <h3>
          ${attrs.name}
        </h3>
        <div>
          includes: ${ingredientsDOM}, ...
        </div>
      </div>
    </div>
  `
}
