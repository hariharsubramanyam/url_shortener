// Import the fs module.
var fs = require("fs");

/**
 * Maintains a mapping from short names to URLs.
 */
var GoLinks = function() {
  var that = Object.create(GoLinks.prototype);

  // Create private variables.
  var chance = require("chance").Chance();
  var FILENAME = "golinks.json";
  var links = {};

  // Try to read from the file and populate the mapping.
  // An exception is thrown (and ignored) if the file doesn't exist.
  try {
    links = JSON.parse(fs.readFileSync(FILENAME))
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
    links[short] = url;
    return short;
  };

  /**
   * Saves the mappings to the file.
   * @param {Function} callback - The function to execute after the saving is complete.
   */
  that.save = function(callback) {
    fs.writeFile(FILENAME, JSON.stringify(links), callback ? callback : function() {});
  }

  /**
   * Expand the short name to a URL.
   * @param {String} short - The short name.
   * @returns {String} The URL or undefined if there is no URL defined for the short name.
   */
  that.expand = function(short) {
    return links[short];
  };

  Object.freeze(that);
  return that;
};

module.exports = GoLinks();