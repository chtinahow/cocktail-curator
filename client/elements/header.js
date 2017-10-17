const Tram = require('tram-one')
const html = Tram.html()

const headerStyle = `
  color: #e3edf3;
  background: #b25a00;
  padding: 0.8rem;
  margin-top: 0px;
`

const imageStyle = `
  width: 1em;
  margin-bottom: -0.2rem;
  filter: contrast(0%) brightness(180%);
`

const titleStyle = 'grid-area: title;'
const infoStyle = 'grid-area: info;'
const searchStyle = 'grid-area: search;'

const gridStyle = `
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto 1fr auto auto;
  grid-column-gap: 0.25em;
  grid-template-areas:
    "title . info search"
`

module.exports = () => {
  return html`
    <h1 style=${headerStyle} style=${gridStyle}>
      <a href="/" style=${titleStyle}>
        Cocktail Curator
        <img src="/drink.png" style=${imageStyle} />
      </a>
      <a href="/about" style=${infoStyle}>
        <img src="/info.png" style=${imageStyle} />
      </a>
      <a href="/" style=${searchStyle}>
        <img src="/search.png" style=${imageStyle} />
      </a>
    </h1>
  `
}
