import React from 'react'

import { useDispatch } from 'react-redux';

import { selectRoom } from '../../store/actions/roomsAction';


const RoomCard = ({payload}) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch(selectRoom(payload.roomName));
    }
    
    return (
        <div onClick={handleClick} className='room-card'>
            <span>{payload.roomName}</span>
            <span>{payload.members.length}/2</span>
        </div>
    );
}



export default RoomCard
