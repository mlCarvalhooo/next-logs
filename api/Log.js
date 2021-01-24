const { getIO } = require("../socketIO");


var logMessages = [];

function log(logMessage) {
    const io = getIO();

    logMessages.push(logMessage);
    
    io.emit("FromAPI", {log: JSON.parse(JSON.stringify(logMessage))});
}


function getLog() {
    return logMessages;
}

module.exports = { log, getLog };