/* eslint-disable no-undef */
import { Room } from './room'
import { furkansRoom } from './mock-rooms'
import { altay, furkan } from '../user/mock-users'

describe('[room.ts]', () => {
  it('creates instance of room', () => {
    expect(furkansRoom instanceof Room).toBe(true)
  })

  it('join to the room', () => {
    expect(furkansRoom.join(altay)).toEqual(furkansRoom)
    expect(furkansRoom.join(furkan)).toEqual(furkansRoom)
    console.log(furkansRoom.members)
  })

  it('getting members of the room', () => {
    expect(furkansRoom.members).toEqual([altay, furkan])
  })

  it('amIHost', () => {
    expect(furkansRoom.amIhost(altay)).toBe(true)
    expect(furkansRoom.amIhost(furkan)).toBe(false)
  })
})
