/* eslint-disable */
import { User } from '../user/user'

interface UserPoint{
  name:string,
  point: number
}
export class Room {
    roomName: string
    round: number = 1
    static rooms: Room[] = []
    members: User[] = []
    
    currentRoundScore: UserPoint[] = []
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
        this.currentRoundScore = []
        return true
      }
      return false
    }

    // I changed 'smile' to 'react'
    react (user: User) {
      const newUserPoint: UserPoint = {
        name: user.name,
        point: 0
      }
      this.currentRoundScore.push(newUserPoint) 
    }

    getRoundScore () {
      this._calcCurrentNonReactPlayer()
      return this.currentRoundScore
    }

    getOverAllScore () {
      return this.overallScore
    }

    endGame () {
      // I can't use for in for loop in typescript
      
      // const leaderboardTable = {}
      // const playedRounds = Object.values(this.overallScore)
      // playedRounds.forEach(round => {
      //   
      // })
    }
    _calcCurrentNonReactPlayer(){
      // It helps to create object for who not react this round
      this.members.forEach(member => {
        let foundedFlag = this.currentRoundScore.some(userP => {
          return userP.name == member.name
        })
        if(!foundedFlag) this.currentRoundScore.push({name:member.name, point: 1})
      })
    }
}
