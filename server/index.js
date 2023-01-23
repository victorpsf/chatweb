import dotenv from 'dotenv'
import http from 'http'
import express from 'express'
import { download } from './control/duplex.js'
import { SocketManager } from './control/socket.js'

dotenv.config()
import { HOST, PORT } from './lib/config.js'

let app = express()
app.use(download)

let server = http.createServer(app)
SocketManager(server);

server.listen(PORT, HOST, () => console.log(`server open in http://${HOST}:${PORT}/`))