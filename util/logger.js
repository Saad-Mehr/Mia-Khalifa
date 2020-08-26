const fs     = require('fs');
const morgan = require('morgan');

//const accessLog = fs.createWriteStream('../access.log', { flags: 'a' });
//const logger = morgan('combined', { stream: accessLog });

const logger = morgan('dev');

module.exports = logger;
