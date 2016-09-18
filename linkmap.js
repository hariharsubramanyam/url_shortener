// Import file system utilities.
var fs = require("fs");

// Import randomization library for generating random short names. 
var chance = require("chance").Chance();

/**
 * Maintains a mapping from short names to URLs.
 */
var LinkMap = function() {
  var that = Object.create(LinkMap.prototype);

  // Create private variables.
  var FILENAME = "linkmap.json";
  var links = []; // This will hold [short name, URL] pairs.

  // Try to read from the file and populate the mapping.
  // An exception is thrown (and ignored) if the file doesn't exist.
  try {
    links = JSON.parse(fs.readFileSync(FILENAME));
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
    var pairs = links.filter(function(pair) {
      return pair[0] === short;
    });
    if (pairs.length > 0) {
      pairs[0][1] = url;
    } else {
      links.push([short, url]);
    }
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
    var pairs = links.filter(function(pair) {
      return pair[0] === short;
    });
    return pairs.length > 0 ? pairs[0][1] : undefined;
  };

  Object.freeze(that);
  return that;
};

module.exports = LinkMap();
