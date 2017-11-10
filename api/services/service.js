
const object = require('lodash/object')

module.exports = {
  /**
   * Clean a Json Array by keeping only the properties needed
   */
  cleanJsonArray (JsonArray, properties) {
    let cleanedJsonArray = []
    JsonArray.forEach(item => cleanedJsonArray.push(object.pick(item, properties)))
    return cleanedJsonArray
  },

  /**
   * Clean a Json by keeping only the properties needed
   */
  cleanJson (json, properties) {
    let cleanedJson = {}
    cleanedJson = object.assign(cleanedJson, object.pick(json, properties))
    return cleanedJson
  }
}
