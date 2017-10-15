module.exports = {
  init: () => [],
  addIngredient: (ingredients, ingredient) => {
    console.log(ingredients, ingredient)
    return ingredients.concat(ingredient)
  }
}
