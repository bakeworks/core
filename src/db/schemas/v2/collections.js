module.exports = {
  users: {
    name: 'users',
    fields: {
      _id: 'objectId',
      user_id: 'col',
      given_name: 'string',
      family_name: 'string',
      nickname: 'string',
      email: 'string',
      phone: 'string'
    }
  },
  passwords: {
    name: 'passwords',
    fields: {
      _id: 'objectId',
      user_id: 'objectId',
      hash: 'string'
    }
  },
  products: {
    name: 'products',
    fields: {
      _id: 'objectId',
      code: 'string',
      name: 'string',
      status_code: 'string',
      origin_code: 'string',
      action_code: 'string',
      job_priority: 'int',
      supply_cost: 'string',
      sale_price: 'decimal',
      xero_id: 'string'
    }
  },
  customers: {
    name: 'customers',
    fields: {
      _id: 'objectId',
      code: 'string',
      name: 'string',
      delivery_run: 'string',
      contact: 'string',
      phone: 'string',
      email: 'string',
      web: 'string',
      street: 'string',
      town: 'string',
      post_code: 'string',
      note: 'string',
      discount: 'decimal',
      xero_invoicing: 'string',
      xero_id: 'string'
    }
  },
  recipes: {
    name: 'recipes',
    fields: {
      _id: 'objectId',
      product_id: 'objectId',
      measure_code: 'string', // 'A' = actual, 'B' = bakers
      batch_code: 'string', // deprecated: None, Fixed, Variable
      batch_min: 'decimal',
      batch_step: 'decimal',
      batch_max: 'decimal',
      batch_partial: 'string', // 'T' = true, 'F' = false
      item_weight: 'decimal',
      items_per_batch: 'int',
      days: 'string', // csv of production days of week 0..6
      note: 'string'
    }
  },
  ingredients: {
    name: 'ingredients',
    fields: {
      _id: 'objectId',
      recipe_id: 'objectId',
      product_id: 'objectId',
      measure: 'decimal',
      lead_time: 'int' // days
    }
  },
  standing_orders: {
    name: 'standing_orders',
    fields: {
      _id: 'objectId',
      customer_id: 'objectId',
      product_id: 'objectId',
      quantities_csv: 'string' // csv
    }
  },
  special_orders: {
    name: 'special_orders',
    fields: {
      _id: 'objectId',
      customer_id: 'objectId',
      product_id: 'objectId',
      week: 'string', // YYYMMDD
      quantities_csv: 'string' // csv
    }
  },
  production_schedules: {
    name: 'production_schedules',
    fields: {
      _id: 'objectId',
      product_id: 'objectId',
      week: 'string', // YYYYMMDD
      action_code: 'string', // Weigh, 'Mix', ...
      lead_time: 'int', // int, number of days
      quantities_csv: 'string' // csv
    }
  },
}
