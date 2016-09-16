// Import file system utilities.
var fs = require("fs");

// Import randomization library for generating random short names. 
var chancejs = require("chance");

/**
 * Maintains a mapping from short names to URLs.
 */
var LinkMap = function() {
  var that = Object.create(LinkMap.prototype);

  // Create private variables.
  var chance = chancejs.Chance();
  var FILENAME = "linkmap.json";
  var links = new Map(); // This is an ES6 feature.

  // Try to read from the file and populate the mapping.
  // An exception is thrown (and ignored) if the file doesn't exist.
  try {
    links = new Map(JSON.parse(fs.readFileSync(FILENAME)));
  } catch (ex) {}

  /**
   * Add a mapping from short name to URL.
   * @param {String} url - The URL, it should begin with http:// or https://
   * @param {String} short - The short name for the URL. If it's not provided, 
   *  a random short name will be generated.
   * @returns {String} The short name of the URL.
   */
  that.add = function(url, short) {
    short = short ? short : chance.word();
    links.set(short, url);
    return short;
  };

  /**
   * Saves the mappings to the file.
   * @param {Function} callback - The function to execute after the saving is complete.
   */
  that.save = function(callback) {
    //[...links] is ES6 spread syntax, it turns the map into an array of [key, value] pairs.
    fs.writeFile(FILENAME, JSON.stringify([...links]), callback ? callback : function() {});
  }

  /**
   * Expand the short name to a URL.
   * @param {String} short - The short name.
   * @returns {String} The URL or undefined if there is no URL defined for the short name.
   */
  that.expand = function(short) {
    return links.get(short);
  };

  Object.freeze(that);
  return that;
};

module.exports = LinkMap();