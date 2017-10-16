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
      </div>
    </div>
  `
}
