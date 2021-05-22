/* eslint-disable */
import { User } from '../user/user'

interface UserPoint{
  name: string,
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
        point: 1
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
      // Possibly it's an expensive algorithm, might be solved with .reduce() but I couldn't do it.
      
      const leaderboard: {
        [key: string]: number,
      } = {}
      
      /* this.overallScore looks like -> 
      {
      1: [
        { name: 'Altay Simsek', point: 1 },
        { name: 'Furkan Portogal', point: 1 }
      ],
      2: [
        { name: 'Furkan Portogal', point: 1 },
        { name: 'Altay Simsek', point: 0 }
      ]
      }
      */
      const rounds = Object.entries(this.overallScore)
      rounds.forEach(([round, players]: [any, any]) => {
        players.forEach((player: {name:string,point:number}) => {
          if(leaderboard.hasOwnProperty(player.name)){
            leaderboard[player.name] += player.point
          }else{
            leaderboard[player.name] = 0
            leaderboard[player.name] += player.point
          }
        })
      })
      
      return (Object.entries(leaderboard).sort(function (a, b) { return b[1] - a[1] }))
    }

    close(user: User){
      if (user === this.members[0] ) {
        const thisRoom = this
        Room.rooms = Room.rooms.filter(room => room !== thisRoom)
        return true
      }
      return false
    }
    _calcCurrentNonReactPlayer(){
      // It helps to create object for who not react this round
      this.members.forEach(member => {
        let foundedFlag = this.currentRoundScore.some(userP => {
          return userP.name == member.name
        })
        if(!foundedFlag) this.currentRoundScore.push({name:member.name, point: 0})
      })
    }
}
