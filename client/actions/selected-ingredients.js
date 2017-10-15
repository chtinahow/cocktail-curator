module.exports = {
  init: () => [],
  addIngredient: (ingredients, newIngredient) => {
    console.log(ingredients, newIngredient)
    if (ingredients.indexOf(newIngredient) === -1) {
      return ingredients.concat(newIngredient)
    }
    return ingredients
  },
  removeIngredient: (ingredients, removedIngredient) => {
    return ingredients.filter(ingredient => ingredient !== removedIngredient)
  }
}
