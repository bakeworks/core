// https://quasar.dev/quasar-utils/date-utils
// TODO: Quasar has many date utilities built-in
const $qdate = require('quasar').date

const $unicode = require('../util/$unicode')

export const YYYYMMDD = 'YYYYMMDD'
export const YYYYMMDD_DASH = 'YYYY-MM-DD'
export const YYYYMMDD_SLASH = 'YYYY/MM/DD'
export const DAY_MONTH_NAME_SHORT = 'DD MMM'
export const DAY_MONTH_NAME_SHORT_YEAR = 'DD MMM YYYY'
export const DAY_MONTH_NAME_LONG = 'DD MMMM'
export const DAY_MONTH_NAME_LONG_YEAR = 'DD MMMM YYYY'
export const DEFAULT_FORMAT = YYYYMMDD_DASH
export const NEARBY_WEEKS_SEPARATOR = ` ${$unicode.ARROW_RIGHT} `

export function extractDate (dateString, argFmt = undefined) {
  var fmt = argFmt
  if (fmt === undefined) {
    if (dateString.includes('-')) {
      fmt = YYYYMMDD_DASH
    } else if (dateString.includes('/')) {
      fmt = YYYYMMDD_SLASH
    } else {
      fmt = YYYYMMDD
    }
  }
  const d = $qdate.extractDate(dateString, fmt)
  console.log(`date.extractDate(${dateString}, ${fmt}) return ${d}`)
  return d
}

export function format (date, fmt) {
  return $qdate.formatDate(date, fmt)
}

export function today (fmt = YYYYMMDD_DASH) {
  return format(new Date(), fmt)
}

export function labelDayMonthNameConcise (date) {
  return format(date, DAY_MONTH_NAME_SHORT)
}

export function labelDayMonthNameVerbose (date) {
  return $qdate.formatDate(date, DAY_MONTH_NAME_LONG)
}

export function addDays (date, days) {
  return $qdate.addToDate(date, { days: days })
}

export function addWeeks (date, weeks) {
  return $qdate.addToDate(date, { days: weeks * 7 })
}

export function addMonths (date, months) {
  return $qdate.addToDate(date, { month: months })
}

export function addYears (date, years) {
  return $qdate.addToDate(date, { year: years })
}

export function weekCommencing (date) {
  const dow = $qdate.getDayOfWeek(date)
  return addDays(date, -dow)
}

export function startOfWeek (date) {
  return weekCommencing(date)
}

export function weekFinish (date) {
  return addDays(startOfWeek(date), 6)
}

export function endOfWeek (date) {
  return weekFinish(date)
}

export function weekFromCurrent (offset) {
  return addWeeks(weekCommencing(new Date()), offset)
}

export const DEFAULT_N_NEARBY_WEEKS = 9

// Returns array of weeks in yyyymmdd format from -2 to +4 weeks away
export function nearbyWeeksDates (nWeeks = DEFAULT_N_NEARBY_WEEKS) {
  const result = []
  for (let i = 0; i < nWeeks; i++) {
    result.push(weekFromCurrent(i))
  }
  return result
}

export function nearbyWeeksTags (nWeeks = DEFAULT_N_NEARBY_WEEKS) {
  const result = []
  for (let i = 0; i < nWeeks; i++) {
    const tag = i === 0 ? 'This week' : (i === 1 ? 'Next week' : `+ ${i} weeks`)
    result.push(tag)
  }
  return result
}

export function nearbyWeeksLabels (fmt = DEFAULT_FORMAT, nWeeks = DEFAULT_N_NEARBY_WEEKS) {
  const result = []
  nearbyWeeksDates(nWeeks).forEach((week, index) => {
    // const tag = index === 0 ? 'This week' : (index === 1 ? 'Next week' : `+ ${index} weeks`)
    // result.push(tag + NEARBY_WEEKS_SEPARATOR + format(week, fmt))
    result.push(format(week, fmt))
  })
  return result
}

export function weekDates (firstWeekYYYYMMDD, nWeeks = DEFAULT_N_NEARBY_WEEKS) {
  const firstWeek = extractDate(firstWeekYYYYMMDD, YYYYMMDD)
  const result = []
  for (let i = 0; i < nWeeks; i++) {
    result.push(addWeeks(firstWeek, i))
  }
  return result
}

export function weekYYYYMMDDs (firstWeekYYYYMMDD, nWeeks = DEFAULT_N_NEARBY_WEEKS) {
  return weekDates(firstWeekYYYYMMDD, nWeeks).map(d => format(d, YYYYMMDD))
}
