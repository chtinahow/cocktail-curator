const Tram = require('tram-one')
const html = Tram.html()

const combobox = require('combobox')
const comboboxCSS = '.autocomplete__label{font-size:1.5rem}.autocomplete__input{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;border:1px solid;border-radius:3px;padding:.5rem 1rem;font-size:1rem}.autocomplete__select{display:none}.autocomplete__results{position:absolute;top:100%;left:0;right:0;margin:0;padding:0;max-height:0;overflow-y:auto;-webkit-transition:all 260ms ease-in-out;transition:all 260ms ease-in-out;opacity:0;border:1px solid;border-radius:3px}.autocomplete__results--is-visible{max-height:280px;opacity:1}.autocomplete__result{list-style:none;font-size:1rem;margin:0;padding:.5rem 1rem;cursor:pointer}.autocomplete__result+.autocomplete__result{border-top:1px solid}.autocomplete__result--is-selected,.autocomplete__result:hover{background:#eee}.autocomplete__notice{position:absolute;clip:rect(1px,1px,1px,1px);padding:0;border:0;height:1px;width:1px;overflow:hidden}'

const comboboxCustomCSS = html`
  <style>
    .autocomplete__result {
      background: #ea8800;
    }
    .autocomplete__result:hover {
      background: #ff9400;
    }

    .autocomplete__input {
      background: #ea8800;
    }
  </style>
`

module.exports = () => {
  const selectIngredient = (event) => {
    const ingredientValue = event.target.dataset.value
    if (ingredientValue) {
      console.log(ingredientValue)
    }
  }

  return html`
    <div onclick=${selectIngredient}>
      <style>${comboboxCSS}</style>
      <style>${comboboxCustomCSS}</style>
      ${combobox}
      <label for="example">Add Ingredients </label>
      <select id="example" class="autocomplete">
        <option value="Lime">Lime</option>
        <option value="Sugar">Sugar</option>
        <option value="Rum">Rum</option>
      </select>
    </div>
  `
}
