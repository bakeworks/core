// https://www.compart.com/en/unicode/block/U+2000
// https://graphemica.com/categories/other-punctuation
// https://www.rapidtables.com/code/text/unicode-characters.html
// https://unicode-search.net/unicode-namesearch.pl?term=DIAMOND
// https://en.wikipedia.org/wiki/List_of_Unicode_characters#Arrows

const ARROW_LEFT = '\u2190'
const DIAMOND_SOLID_4 = '\u2756'
const ESCAPE = `\u238B`
const LOOPED_SQUARE = `\u2318`
const REWIND_BUTTON = `\u23ea`
const FISHEYE = `\u25C9`

export default {
  ARROW_LEFT,
  ARROW_RIGHT: '\u2192',
  ARROW_UP: '\u2191',
  ARROW_DOWN: '\u2193',
  ARROW_CIRCLE_CLOCKWISE: '\u21bb', // '\u27f3' // '\u21bb' // '\u27f3'
  ARROW_CIRCLE_ANTICLOCKWISE: '\u21ba', // '\u27f2' // '\u21ba' // '\u27f2'
  ARROW_RESET: '\u21B4', // '\u23ce'
  ARROW_STANDING: '\u23CF',

  ASTERISK: '\u002A',
  BULLET: '\u2022',
  HYPHEN_BULLET: '\u2043',
  DASH: '\u2014',
  TRICOLON: '\u205D',
  QUADCOLON: '\u205E',
  FLOWER_MARK: '\u2055',
  EQUAL_WIDE: '\uff1d',
  REPEAT: '\u267b',
  DOUBLE_PIPE: '\u20E6',
  DIAMOND_SOLID: '\u2b25', // '\u20DF'
  DIAMOND_HOLLOW: '\u2b26', // '\u20DF'

  DIAMOND_SOLID_4,

  ESCAPE,
  LOOPED_SQUARE,
  REWIND_BUTTON,
  FISHEYE,

// app specific
  STANDING_ORDER: FISHEYE // DIAMOND_SOLID_4
}

