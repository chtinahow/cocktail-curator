const Tram = require('tram-one')
const html = Tram.html({
  header: require('../elements/header')
})

const pageStyle = `
  margin: 1em;
  text-align: center;
`

const divStyle = `
  font-size: 1.5em;
  padding: 0.25em;
`

const link = `
  white-space: nowrap;
  border-bottom: solid 1px black;
`

module.exports = () => {
  return html`
    <div>
      <header></header>
      <div style=${pageStyle}>
        <div style=${divStyle}>
          Cocktail Curator created by
          <a style=${link} href="https://github.com/chtinahow/">Tina Howard</a> and
          <a style=${link} href="http://jrjurman.com/">Jesse Jurman</a>
        </div>
        <div style=${divStyle}>
          Project Code on
          <a style=${link} href="https://github.com/chtinahow/cocktail-curator">
            github.com/chtinahow/cocktail-curator
          </a>
        </div>
        <div style=${divStyle}>
          <a style=${link} href="http://www.thecocktaildb.com/">
            Powered by TheCocktailDB.com
          </a>
        </div>
        <div style=${divStyle}>
          <a style=${link} href="http://tram-one.io/">
            Built using Tram-One
          </a>
        </div>
        <div style=${divStyle}>
          <a style=${link} href="https://www.emojione.com/">
            Icon from Emojione
          </a>
        </div>
      </div>
    </div>
  `
}
