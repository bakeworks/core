async function foreverAsync(callback) {
  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    await callback()
  }
}

// call back should return true to continue, false to break loop
async function forEachAsync(array, callback) {
  for (let i = 0; i < array.length; i += 1) {
    const el = array[i]
    // eslint-disable-next-line no-await-in-loop
    const r = await callback(el)
    if (!r) break
  }
}

export default {
  foreverAsync,
  forEachAsync
}
