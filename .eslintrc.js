const fs = require('fs')

// Ignore `sails` global var
let globals = ['sails', 'location', 'require']

// Ignore models and services global vars
globals = globals
  .concat(fs.readdirSync('./api/models'))
  .concat(fs.readdirSync('./api/services'))

// Transform globals array to an object,
// and remove filesname ".js" extension
globals = globals.reduce((acc, cur, i) => {
  acc[cur.replace('.js', '')] = true
  return acc
}, {})

module.exports = {
  /**
   * Use JavaScript Standard Style.
   * See https://standardjs.com
   */
  'extends': 'standard',

  /**
   * Ignore global variables.
   * See https://eslint.org/docs/user-guide/configuring#specifying-globals
   */
  'globals': globals,

  'rules': {
    'global-require': ['error'],
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 1 }],
    'no-unused-vars': 'off',
    'one-var': 'off',
    'no-extend-native': 'off'
  }
};

