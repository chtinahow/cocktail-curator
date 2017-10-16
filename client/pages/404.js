const Tram = require('tram-one')
const html = Tram.html({
  header: require('../elements/header')
})

const pageStyle = `
  margin: 1em;
  text-align: center;
`

module.exports = () => {
  return html`
    <div>
      <header></header>
      <div style=${pageStyle}>
        <h1>404</h1>
        <img src="/404.gif" />
      </div>
    </div>
  `
}
