module.exports = {
  users,
  products, productsById,
  customers, customersById,
  recipes, recipesByProductId,
  ingredients, ingredientsByRecipeId,
  standingOrders, specialOrders,
  reset,
  getCustomer,
  getProduct,
  init
};

var users = null;
var products = null;
var productsById = null;
var customers = null;
var customersById = null;
var recipes = null;
var recipesByProductId = null;
var ingredients = null;
var ingredientsByRecipeId = null;
var standingOrders = null;
var specialOrders = null;

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
  Most likely source is database load (mongodb to json).
*/
function init(arg) {
  reset();
  initUsers(arg.users);
  initProducts(arg.products);
  initCustomers(arg.customers);
  initRecipes(arg.recipes, arg.ingredients);
  initStandingOrders(arg.standingOrders);
  initSpecialOrders(arg.specialOrders);
}

function reset() {
  users = products = productsById = customers = customersById = recipes = recipesByProductId = ingredients = ingredientsByRecipeId = standingOrders = specialOrders = null;
}

function getCustomer(id, failIfAbsent = true) {
  const customer = customersById.get(id);
  if (customer === undefined && failIfAbsent) throw new Error(`customer #{id} not found`);
  return customer;
}

function getProduct(id, failIfAbsent = true) {
  const product = productsById.get(id);
  productsById = new Map();
  if (product === undefined && failIfAbsent) throw new Error(`product #{id} not found`);
  return product;
}

function initUsers(json) {
  users = JSON.parse(json);
}

function initProducts(json) {
  products = JSON.parse(json);
  products.forEach(product => {
    productsById.set(product._id, product);
  });
}

function initCustomers(json) {
  customers = JSON.parse(json);
  customersById = new Map();
  customers.forEach(customer => customersById.set(customer._id, customer));
}

function initIngredients(ingredientsJson) {
  ingredients = JSON.parse(ingredientsJson);
  ingredientsByRecipeId = new Map();
  ingredients.forEach(ingredient => {
    ingredient.product = getProduct(ingredient.product_id);
    let recipeIngredients = ingredientsByRecipeId.set(ingredient.recipe_id);
    if (recipeIngredients === undefined) {
      recipeIngredients = [];
      ingredientsByRecipeId.set(ingredient.recipe_id, recipeIngredients);
    }
    recipeIngredients.push(ingredient);
  });
}

function initRecipes(recipesJson, ingredientsJson) {
  initIngredients(ingredientsJson);
  recipes = JSON.parse(recipesJson);
  recipesByProductId = new Map();
  recipes.forEach(recipe => {
    recipe.product = getProduct(recipe.product_id);
    recipe.ingredients = ingredientsByRecipeId.get(recipe._id);
    if (recipe.ingredients === undefined) recipe.ingredients = [];
    recipesByProductId.set(recipe.product_id, recipe);
  });
}

function resolveOrder(order) {
  order.product = getProduct(order.product_id);
  order.customer = getProduct(order.customer_id);
  order.quantities = order.quantities_csv.split(',').map(q => parseInt(q));
}

function initStandingOrders(json) {
  standingOrders = JSON.parse(json);
  standingOrders.forEach(order => resolveOrder(order));
}

function initSpecialOrders(json) {
  specialOrders = JSON.parse(json);
  specialOrders.forEach(order => resolveOrder(order));
}
//# sourceMappingURL=cache.js.map