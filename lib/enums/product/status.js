/*
Product status:
  * finished
  * ingredient

Status properties
{
  code,
  label,
  isFinished,
  isIngredient
}
*/

const FINISHED_CODE = 'F'
const INGREDIENT_CODE = 'I'

function instantiate(code, label) {
  return {
    code: code,
    label: label,
    isFinished: code === FINISHED_CODE,
    isIngredient: code === INGREDIENT_CODE
  }
}

const FINISHED = instantiate(FINISHED_CODE, 'Finished')
const INGREDIENT = instantiate(INGREDIENT_CODE, 'Ingredient')
const ALL = [FINISHED, INGREDIENT]
