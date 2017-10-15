module.exports = {
  init: () => [],
  addIngredient: (ingredients, ingredient) => {
    console.log(ingredients, ingredient)
    if (ingredients.indexOf(ingredient) === -1) {
      return ingredients.concat(ingredient)
    }
    return ingredients
  }
}
