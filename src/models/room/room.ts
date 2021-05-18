/* eslint-disable */
import { User } from '../user/user'

export class Room {
    roomName: string
    round: number = 1
    static rooms: Room[] = []
    members: User[] = []
    currentRoundScore?: any = {}
    overallScore?: any = {}

    constructor (roomName: string) {
      this.roomName = roomName
      Room.rooms.push(this)
    }

    join (user: User) {
      this.members.push(user)
      user.room = this
      return this
    }

    amIhost (user: User) {
      return this.members[0] === user
    }

    static allRooms () {
      return Room.rooms
    }

    static getRoom (name: string) {
      return Room.rooms.find(room => room.roomName === name)
    }

    nextRound (user: User) {
      if (user === this.members[0]) {
        // add history of a currentRound to gameScore and resetting currentRound
        this.overallScore[this.round] = this.currentRoundScore
        this.round++
        this.currentRoundScore = {}
        return true
      }
      return false
    }

    // I changed 'smile' to 'react'
    react (user: User) {
      this.currentRoundScore[user.name] = 0
    }

    getRoundScore () {
      // Set property for non react players
      this.members.forEach(member => {
        // if this.currentRoundScore[member.name], not work well
        // eslint-disable-next-line no-prototype-builtins
        if (!this.currentRoundScore.hasOwnProperty(member.name)) {
          this.currentRoundScore[member.name] = 1
        }
      })
      return this.currentRoundScore
    }

    getOverAllScore () {
      return this.overallScore
    }

    endGame () {
      // Calculate the points
      
      // const leaderboardTable = {}
      // const playedRounds = Object.values(this.overallScore)
      // console.log(playedRounds)
      // this.members.forEach(member => {
      //   playedRounds.forEach(function (selectedRound: {}){
      //     console.log(selectedRound[member.name])
      //   })
      // })
    }
}
