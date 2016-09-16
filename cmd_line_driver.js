/**
 * Parse the command line arguments when this file is executed as one of::
 * (1) node cmd_line_driver.js get <short_name>
 * (2) node cmd_line_driver.js set <url> <short_name>
 * (3) node cmd_line_driver.js set <url>
 * @returns {Array} Case 1: [<short_name>], 2: [<url>, <short_name>], 3: [<url>, undefined]. 
 */
var parseCommand = function() {
  if (process.argv[2] === "get") {
    return [process.argv[3]];
  } else {
    return [process.argv[3], process.argv.length > 4 ? process.argv[4] : undefined]
  }
};

var linkmap = require("./linkmap.js");
var command = parseCommand();
if (command.length === 1) {
  console.log(linkmap.expand(command[0]));
} else {
  console.log(linkmap.add(command[0], command[1]));
  linkmap.save();
}