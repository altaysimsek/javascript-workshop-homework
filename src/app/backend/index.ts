const http = require('http')
const cors = require('cors')
const express = require('express')
const socketio = require('socket.io')
const { toJSON } = require('flatted')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const { Room } = require('../../models/room/room')
const { User } = require('../../models/user/user')

const port = process.env.PORT || 8000

app.use(cors())

io.on('connection', (socket: any) => {
  const socketUser = new User(socket.id, socket.id)
  console.log(`[${new Date()}]: a new socket connected. - [${socketUser.id}]`)

  socket.emit('rooms', toJSON(Room.allRooms()))

  socket.on('joinRoom', (roomName: any) => {
    const selectedRoom = Room.getRoom(roomName)
    selectedRoom.join(socketUser)
    // console.log('Selected room is: ', selectedRoom)
    console.log(toJSON(Room.allRooms()))
    io.emit('rooms', toJSON(Room.allRooms()))
  })

  socket.on('newRoom', (roomName: any) => {
    const newRoom = new Room(roomName || socket.id)
    console.log(`Created room is : ${newRoom}, from ${socket.id}`)
    io.emit('rooms', toJSON(Room.allRooms()))
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
  })
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
