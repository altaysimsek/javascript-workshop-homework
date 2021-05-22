/* eslint-disable no-undef */
import { Room } from './room'
import { furkansRoom, altaysRoom } from './mock-rooms'
import { altay, furkan } from '../user/mock-users'

describe('[room.ts]', () => {
  it('creates instance of room', () => {
    expect(furkansRoom instanceof Room).toBe(true)
  })

  it('reaching to all rooms', () => {
    expect(Room.allRooms()).toEqual([furkansRoom, altaysRoom])
  })

  it('reaching to the room by name', () => {
    expect(Room.getRoom("Altay's room")).toEqual(altaysRoom)
  })

  it('join to the room', () => {
    expect(furkansRoom.join(altay)).toEqual(furkansRoom)
    expect(furkansRoom.join(furkan)).toEqual(furkansRoom)
  })

  it('getting members of the room', () => {
    expect(furkansRoom.members).toEqual([altay, furkan])
  })

  it('is the user host', () => {
    expect(furkansRoom.amIhost(altay)).toBe(true)
    expect(furkansRoom.amIhost(furkan)).toBe(false)
  })

  it('check round before the game start', () => {
    expect(furkansRoom.round).toEqual(1)
  })

  it('reacting for both', () => {
    furkansRoom.react(altay)
    furkansRoom.react(furkan)
    expect(furkansRoom.getRoundScore()).toEqual([
      { name: 'Altay Simsek', point: 1 },
      { name: 'Furkan Portogal', point: 1 }
    ])
  })

  it('reacting for one', () => {
    furkansRoom.nextRound(altay)
    furkansRoom.react(furkan)
    expect(furkansRoom.getRoundScore()).toEqual([
      { name: 'Furkan Portogal', point: 1 },
      { name: 'Altay Simsek', point: 0 }
    ])
  })

  it('next round for room', () => {
    expect(furkansRoom.nextRound(altay)).toBe(true)
    expect(furkansRoom.nextRound(furkan)).toBe(false)
  })

  it('check round after next round', () => {
    expect(furkansRoom.round).toEqual(3)
  })

  it('get the overall game score ', () => {
    expect(furkansRoom.getOverAllScore()).toEqual({
      1: [
        { name: 'Altay Simsek', point: 1 },
        { name: 'Furkan Portogal', point: 1 }
      ],
      2: [
        { name: 'Furkan Portogal', point: 1 },
        { name: 'Altay Simsek', point: 0 }
      ]
    })
  })

  it('end of the game ', () => {
    expect(furkansRoom.endGame()).toEqual([['Furkan Portogal', 2], ['Altay Simsek', 1]])
  })

  it('close the room ', () => {
    expect(furkansRoom.close(furkan)).toBe(false)
    expect(furkansRoom.close(altay)).toBe(true)
    expect(Room.allRooms()).toEqual([altaysRoom])
  })
})
