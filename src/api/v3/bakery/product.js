import uuid from '../../../util/uuid.js'

function newProductFromRecipe(recipe) {
  return {
    _id: uuid.newUUID(),
    code: recipe.code,
    name: recipe.name,
    recipeType: recipe.type,
    recipeId: recipe._id,
    xeroId: null,
    prices: {
      retail: 0,
      wholesale: 0
    }
  }
}

export default {
  newProductFromRecipe
}
