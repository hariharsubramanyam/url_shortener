/**
 * Parse the command line arguments when this file is executed as:
 * (1) node gocmd.js get <short_name>
 * OR
 * (2) node gocmd.js set <url> <short_name>
 * OR
 * (3) node gocmd.js set <url>
 * 
 * @returns {Array} In case (1), we return [<short_name>]. 
 * In case (2), we return [<url>, <short_name>].
 * In case (3), we return [<url>, undefined]. 
 */
var parseCommand = function() {
  if (process.argv[2] === "get") {
    return [process.argv[3]];
  } else {
    return [process.argv[3], process.argv.length > 4 ? process.argv[4] : undefined]
  }
};

var golinks = require("./golinks.js");

var command = parseCommand();
if (command.length === 1) {
  console.log(golinks.expand(command[0]));
} else {
  console.log(golinks.add(command[0], command[1]));
  golinks.save();
}