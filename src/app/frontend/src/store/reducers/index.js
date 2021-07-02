import { combineReducers } from 'redux'

import roomsReducer from './roomsReducer'

const allReducers = combineReducers({
    rooms: roomsReducer
})

export default allReducers