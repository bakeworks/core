/*
** BAKERY AS SUBSCRIBER TO BAKEWORKS
*/

const MODES = {
  intro: {
    code: 'intro',
    label: 'string',
    summary: 'string',
    blurb: 'string',
    basis: 'string', // 'free', 'fixed', 'volume'
    availability: {
      start: 'string', // yyyymmdd
      finish: 'string' // yyyymmdd
    },
    duration: 'int', // e.g. 30, 3, 1
    period: 'string', // 'day', 'month', 'year'
    maxVolume: 'int', // kgs?
    costPerUnit: 'decimal',
    billingCycle: 'string' // month, year
  },
  free: {
    code: 'free',
    label: 'string',
    summary: 'string',
    blurb: 'string',
    basis: 'string', // 'free', 'fixed', 'volume'
    availability: {
      start: 'string', // yyyymmdd
      finish: 'string' // yyyymmdd
    },
    duration: 'int', // e.g. 30, 3, 1
    period: 'string', // 'day', 'month', 'year'
    maxVolume: 'int', // kgs?
    costPerUnit: 'decimal',
    billingCycle: 'string' // month, year
  },
  fixed: {
    code: 'fixed',
    label: 'string',
    summary: 'string',
    blurb: 'string',
    basis: 'string', // 'free', 'fixed', 'volume'
    availability: {
      start: 'string', // yyyymmdd
      finish: 'string' // yyyymmdd
    },
    duration: 'int', // e.g. 30, 3, 1
    period: 'string', // 'day', 'month', 'year'
    maxVolume: 'int', // kgs?
    costPerUnit: 'decimal',
    billingCycle: 'string' // month, year
  },
  volume: {
    code: 'volume',
    label: 'string',
    summary: 'string',
    blurb: 'string',
    basis: 'string', // 'free', 'fixed', 'volume'
    availability: {
      start: 'string', // yyyymmdd
      finish: 'string' // yyyymmdd
    },
    duration: 'int', // e.g. 30, 3, 1
    period: 'string', // 'day', 'month', 'year'
    maxVolume: 'int', // kgs?
    costPerUnit: 'decimal',
    billingCycle: 'string' // month, year
  }
}

export default {
  MODES
}
