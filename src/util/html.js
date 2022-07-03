function tag(t, content, style = null) {
  const styleStr = style ? ` style="${style}"` : ''
  return `<${t}${styleStr}>${typeof content === 'function' ? content() : content}</${t}>`
}

function div(content, style = null) {
  return tag('div', content, style)
}

// * args = { keys, style }
// * style = { table, header, data }
//    * header = { row, cell, keys... }
//    * data = { row, cell, keys... }
function objectsToHtmlTable(objs, args = {}) {
  if (objs.length === 0) return ''
  const keys = args.keys === undefined ? Object.keys(objs[0]) : args.keys
  // console.log(`Object.keys(objs[0]) = ${Object.keys(objs[0])} || keys = ${keys}`)
  const rows = []
  const style = args.style === undefined ? {} : args.style
  const headerStyle = style.header === undefined ? {} : style.header
  const dataStyle = style.data === undefined ? {} : style.data
  let row = []
  keys.forEach(
    key => row.push(
      tag(
        'th',
        key, // string.capitalize(key),
        headerStyle.cell
      )
    )
  )
  // console.log(`headerStyle=${JSON.stringify(headerStyle)}`)
  // console.log(`dataStyle=${JSON.stringify(dataStyle)}`)
  rows.push(
    tag(
      'tr',
      row.join(''),
      headerStyle.row
    )
  )
  objs.forEach(obj => {
    row = []
    keys.forEach(key => {
      row.push(
        tag(
          'td',
          obj[key],
          dataStyle.cell
        )
      )
    })
    rows.push(
      tag(
        'tr',
        row.join(''),
        dataStyle.row
      )
    )
  })
  return tag(
    'table',
    rows.join(''),
    style.table
  )
}

function jsonToHtmlTable(json) {
  const table = html.objectsToHtmlTable(
    json,
    {
      style: {
        table: '', // 'border: 1px solid black',
        header: {
          row: 'background: #555; color: white; font-weight: 300; font-size: smaller',
          cell: 'padding: 4px; text-align: center; max-width: 12rem; word-wrap: break-word'
        },
        data: {
          row: 'background: #eee; font-size: smaller; border: 1px solid black',
          cell: 'text-align: center; max-width: 12rem; word-wrap: break-word'
        }
      },
    }
  )
  return html.div(table, 'font-family: helvetica')
}

export default {
  tag,
  div,
  objectsToHtmlTable,
  jsonToHtmlTable
}
