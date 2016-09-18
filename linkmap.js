// Import file system utilities, hash map, and randomization library.
var fs = require("fs");
var HashMap = require("hashmap");
var chance = require("chance").Chance();

/**
 * Maintains a mapping from short names to URLs.
 */
var LinkMap = function() {
  var that = Object.create(LinkMap.prototype);

  // Create private variables.
  var FILENAME = "linkmap.json";
  var links = new HashMap(); // Maps short names to URLs (the library uses new).

  // Try to read from the file and populate the mapping.
  // An exception is thrown (and ignored) if the file doesn't exist.
  try {
    JSON.parse(fs.readFileSync(FILENAME)).forEach(function(pair) {
      links.set(pair[0], pair[1]);
    });
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
    var pairs = links.keys().map(function(key) {
      return [key, links.get(key)];
    });
    fs.writeFile(FILENAME, JSON.stringify(pairs), callback ? callback : function() {});
  };

  /**
   * Expand the short name to a URL.
   * @param {String} short - The short name.
   * @returns {String} The URL or undefined if there is no URL defined for the short name.
   */
  that.expand = function(short) {
    return links.has(short) ? links.get(short) : undefined;
  };

  Object.freeze(that);
  return that;
};

module.exports = LinkMap();
