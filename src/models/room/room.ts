import { User } from '../user/user'
export class Room {
    roomName: string
    members: User[] = []
    constructor (roomName: string) {
      this.roomName = roomName
    }

    join (user: User) {
      this.members.push(user)
      user.room = this
      return this
    }

    amIhost (user: User) {
      return this.members[0] === user
    }
}
