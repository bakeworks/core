import uuid from '../../../util/uuid'

function newProductFromRecipe(recipe) {
  return {
    _id: uuid.newUUID(),
    code: r.code,
    name: r.name,
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
