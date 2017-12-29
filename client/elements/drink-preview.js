const Tram = require('tram-one')
const html = Tram.html()

const textStyle = `
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
`

const infoStyle = `
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 10px;
  background: inherit;
  background-attachment: fixed;
  overflow: hidden;
`

const blurStyle = html`
  <style>
    .drink-preview-text::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: inherit;
      background-attachment: fixed;
      -webkit-filter: blur(4px);
      filter: blur(4px)
    }
    .drink-preview-text::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.25)
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

  const drinkPreviewStyle = `
    background: url(${attrs.image});
    background-attachment: fixed;
    width: 600px;
    max-width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
    margin: 20px auto;
    background-position: center;
    border-radius: 3rem;
    cursor: pointer;
  `

  return html`
    <div onclick=${onClickDrink}>
      ${blurStyle}
      <div class="drink-preview" style=${drinkPreviewStyle}>
        <div class="drink-preview-text" style=${infoStyle}>
          <h3 style=${textStyle}>
            ${attrs.name}
          </h3>
          <div style=${textStyle}>
            includes: ${ingredientsDOM}, ...
          </div>
        </div>
      </div>
    </div>
  `
}
