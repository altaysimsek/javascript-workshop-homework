const http = require('http')
const cors = require('cors')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const { Room } = require('../../models/room/room')
const { User } = require('../../models/user/user')

const port = process.env.PORT || 8000

app.use(cors())

io.on('connection', (socket: any) => {
  const socketUser = new User(socket.id, socket.id)
  console.log('a user connected', socketUser.id)

  socket.emit('rooms', Room.rooms)

  socket.on('joinRoom', (roomName: any) => {
    socket.join(roomName)
    io.to(roomName).emit('message', `Odaya yeni biri katıldı.${socket.id}`)
  })

  socket.on('newRoom', (roomName: any) => {
    const newRoom = new Room(roomName || socket.id)
    console.log(`Created room is : ${newRoom}, from ${socket.id}`)
    io.emit('rooms', Room.rooms)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
  })
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
