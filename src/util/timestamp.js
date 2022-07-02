const SECONDS_IN_DAY = 24 * 60 * 60
const MILLISECS_IN_MINUTE = 60000
const MILLISECS_IN_HOUR = 60 * MILLISECS_IN_MINUTE
const MILLISECS_IN_DAY = 24 * MILLISECS_IN_HOUR

// Returns string: YYYY-MM-DDTHH:mm:ss.sssZ
// The timezone is always zero UTC offset, as denoted by the suffix "Z".
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
// Prior may be undefined, null, 'second', 'minute', 'hour' or 'day'
// Shift is milliseconds
function getTimestamp(opts = { prior: null, shift: 0 }) {
  const { prior = null, shift = 0 } = opts
  // Date.now() => date in milliseconds UTC
  // then create new date and convert to ISO string which is always UTC denoted by Z suffix
  let millis = Date.now()
  millis -= shift
  if (prior) {
    if (prior === 'second') {
      millis -= millis % 1000
    } else if (prior === 'minute') {
      millis -= millis % MILLISECS_IN_MINUTE
    } else if (prior === 'hour') {
      millis -= millis % MILLISECS_IN_HOUR
    } else if (prior === 'day') {
      millis -= millis % MILLISECS_IN_DAY
    }
  }
  return (new Date(millis)).toISOString()
}

function millisecsSinceTimestamp(timestamp, utcMillisecs = null) {
  const millis = utcMillisecs || Date.now()
  const stampMillis = Date.parse(timestamp).getUTCMilliseconds()
  return millis - stampMillis
}

function isTimestampExpired(timestamp) {
  return millisecsSinceTimestamp(timestamp) <= 0
}

module.exports =  {
  SECONDS_IN_DAY,
  MILLISECS_IN_MINUTE,
  MILLISECS_IN_HOUR,
  MILLISECS_IN_DAY,
  getTimestamp,
  millisecsSinceTimestamp,
  isTimestampExpired
}
