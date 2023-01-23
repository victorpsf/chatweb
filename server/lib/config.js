const process = require('process')

exports.HOST = process.env.SERVER_HOST || 'localhost';
exports.PORT = parseInt(process.env.SERVER_PORT) || 3000;
