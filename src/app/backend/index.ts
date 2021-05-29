const path = require('path')
const http = require('http')
const cors = require('cors')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

app.use(cors())

app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

io.on('connection', (socket: any) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
