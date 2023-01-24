require('dotenv').config()
const http = require('http')
const express = require('express')
const { download } = require('./control/duplex.js')
const { HOST, PORT } = require('./lib/config.js')
const { SocketManager } = require('./control/socket.js')

let app = express()
let server = http.createServer(app)

SocketManager(server);
download(app)

server.listen(PORT, HOST, () => console.log(`server open in http://${HOST}:${PORT}/`))