const path = require('path')
const http = require('http')
const cors = require('cors')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const { Room } = require('../../models/room/room')

const port = process.env.PORT || 8000

app.use(cors())

app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

io.on('connection', (socket: any) => {
  console.log('a user connected')

  socket.emit('rooms', Room.rooms)

  socket.on('newRoom', (roomName: any) => {
    const newRoom = new Room(roomName || socket.id)
    console.log(`Created room is : ${newRoom}, from ${socket.id}`)
    socket.emit('rooms', Room.rooms)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
  })
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
