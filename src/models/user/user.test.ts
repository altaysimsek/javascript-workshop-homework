/* eslint-disable no-undef */
import { User } from './user'
import { Room } from '../room/room'
import { altay, furkan, cagatay } from './mock-users'

describe('[user.ts]', () => {
  it('creates instance of User', () => {
    expect(cagatay instanceof User).toBe(true)
  })

  it('checking instances of User[cagatay]', () => {
    expect(cagatay.id).toEqual('3')
    expect(cagatay.name).toEqual('Ckare')
  })

  it('getting all users', () => {
    expect(User.all()).toEqual([altay, furkan, cagatay])
  })

  it('getting specific users', () => {
    expect(User.get('1')).toEqual(altay)
  })

  it('getting instance of Room', () => {
    const vega = new Room('Vega')
    vega.join(altay)
    expect(altay.getRoom() instanceof Room).toBe(true)
  })
})
