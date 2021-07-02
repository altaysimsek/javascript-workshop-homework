const initializeState = {
    selectedRoom: null,
}

const roomsReducer = (state = initializeState , action) => {
    switch(action.type){
        case 'SELECT_ROOM':
            return {
                ...state,
                selectedRoom: action.payload
            }
        default:
            return state;
    }
}

export default roomsReducer