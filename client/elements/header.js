const Tram = require('tram-one')
const html = Tram.html()

const headerStyle = `
  color: #e3edf3;
  background: #b25a00;
  padding: 0.8rem;
`

const imageStyle = `
  width: 1em;
  margin-bottom: -0.2rem;
`

module.exports = () => {
  return html`
    <a href="/">
      <h1 style=${headerStyle}>
        Cocktail Curator
        <img src="/drink.png" style=${imageStyle}>
      </h1>
    </a>
  `
}
