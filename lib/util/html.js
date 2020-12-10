function tag(t, content) {
  var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var styleStr = style ? ' style="' + style + '"' : '';
  return '<' + t + styleStr + '>' + (typeof content === 'function' ? content() : content) + '</' + t + '>';
}

function div(content) {
  var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return tag('div', content, style);
}

// * args = { keys, style }
// * style = { table, header, data }
//    * header = { row, cell, keys... }
//    * data = { row, cell, keys... }
function objectsToHtmlTable(objs) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (objs.length === 0) return '';
  var keys = args.keys === undefined ? Object.keys(objs[0]) : args.keys;
  // console.log(`Object.keys(objs[0]) = ${Object.keys(objs[0])} || keys = ${keys}`)
  var rows = [];
  var style = args.style === undefined ? {} : args.style;
  var headerStyle = style.header === undefined ? {} : style.header;
  var dataStyle = style.data === undefined ? {} : style.data;
  var row = [];
  keys.forEach(function (key) {
    return row.push(tag('th', key, // string.capitalize(key),
    headerStyle.cell));
  });
  // console.log(`headerStyle=${JSON.stringify(headerStyle)}`)
  // console.log(`dataStyle=${JSON.stringify(dataStyle)}`)
  rows.push(tag('tr', row.join(''), headerStyle.row));
  objs.forEach(function (obj) {
    row = [];
    keys.forEach(function (key) {
      row.push(tag('td', obj[key], dataStyle.cell));
    });
    rows.push(tag('tr', row.join(''), dataStyle.row));
  });
  return tag('table', rows.join(''), style.table);
}

export default {
  tag: tag,
  div: div,
  objectsToHtmlTable: objectsToHtmlTable
};
//# sourceMappingURL=html.js.map