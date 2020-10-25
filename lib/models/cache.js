export var users = []
export var products = []
export var productsById = new Map()
export var customers = []
export var customersById = new Map()
export var recipes = []
export var recipesByProductId = new Map()
export var ingredients = []
export var ingredientsByRecipeId = new Map()
export var standingOrders = []
export var specialOrders = []

export function getCustomer(id, failIfAbsent = true) {
  const customer = customersById.get(id)
  if (customer === undefined && failIfAbsent) throw new Error(`customer #{id} not found`)
  return customer
}

export function getProduct(id, failIfAbsent = true) {
  const product = productsById.get(id)
  if (product === undefined && failIfAbsent) throw new Error(`product #{id} not found`)
  return product
  
}

function initUsers(json) {
  users = JSON.parse(json)
}

function initProducts(json) {
  products = JSON.parse(json)
  products.forEach(product => productsById.set(product._id, product))
}

function initCustomers(json) {
  customers = JSON.parse(json)
  customers.forEach(customer => customersById.set(customer._id, customer))
}

function initIngredients(ingredientsJson) {
  ingredients = JSON.parse(ingredientsJson)
  ingredients.forEach(ingredient => {
    ingredient.product = getProduct(ingredient.product_id)
    let recipeIngredients = ingredientsByRecipeId.set(ingredient.recipe_id)
    if (recipeIngredients === undefined) {
      recipeIngredients = []
      ingredientsByRecipeId.set(ingredient.recipe_id, recipeIngredients)
    }
    recipeIngredients.push(ingredient)
  })
}

function initRecipes(recipesJson, ingredientsJson) {
  initIngredients(ingredientsJson)
  recipes = JSON.parse(recipesJson)
  recipes.forEach(recipe => {
    recipe.product = getProduct(recipe.product_id)
    recipe.ingredients = ingredientsByRecipeId.get(recipe._id)
    if (recipe.ingredients === undefined) recipe.ingredients = []
    recipesByProductId.set(recipe.product_id, recipe)
  })
}

function resolveOrder(order) {
  order.product = getProduct(order.product_id)
  order.customer = getProduct(order.customer_id)
  order.quantities = order.quantities_csv.split(',').map(q => parseInt(q))
}

function initStandingOrders(json) {
  standingOrders = JSON.parse(json)
  standingOrders.forEach(order => resolveOrder(order))
}

function initSpecialOrders(json) {
  specialOrders = JSON.parse(json)
  specialOrders.forEach(order => resolveOrder(order))
}

/*
  Arg should be an object whose properties are json strings:
  {
    users,
    products,
    customers,
    recipes,
    ingredients,
    standingOrders,
    specialOrders
  }
*/
export function init(arg) {
  initUsers(arg.users)
  initProducts(arg.products)
  initCustomers(arg.customers)
  initRecipes(arg.recipes, arg.ingredients)
  initStandingOrders(arg.standingOrders)
  initSpecialOrders(arg.specialOrders)
}