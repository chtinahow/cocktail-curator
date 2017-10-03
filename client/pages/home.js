const Tram = require('tram-one')
const html = Tram.html({
  header: require('../elements/header'),
  'select-ingredients': require('../elements/select-ingredients')
})

module.exports = () => {
  return html`
    <div>
      <header></header>
      <select-ingredients></select-ingredients>
      <div>
        Thank you for using Tram-One!<br>
        To get started, edit <code>client/pages/home.js</code>.
      </div>
    </div>
  `
}
