import { Room } from '../room/room'
export class User {
  static users: User[] = []
  id: string
  name: string
  room?: Room

  constructor (socketId: string, name: string) {
    this.id = socketId
    this.name = name
    User.users.push(this)
  }

  static all () {
    return User.users
  }

  static get (id: string) {
    return User.users.find(user => user.id === id)
  }

  getRoom () {
    return this.room
  }
}
