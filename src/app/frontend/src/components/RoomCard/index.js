import React from 'react'

import { useDispatch } from 'react-redux';

import { selectRoom } from '../../store/actions/roomsAction';
import { useSelector } from 'react-redux';


const RoomCard = ({payload}) => {
    const dispatch = useDispatch();
    const roomie = useSelector((state) => state.rooms);
    const handleClick = (e) => {
        dispatch(selectRoom(payload.roomName));
    }
    
    return (
        <div onClick={handleClick} className={`room-card ${roomie.selectedRoom === payload.roomName ? 'active' : ''}`}>
            <span>{payload.roomName}</span>
            <span>{payload.members.length}/2</span>
            
        </div>
    );
}



export default RoomCard
