import React from 'react'


const RoomCard = ({payload}) => {
    return (
        <div className='room-card'>
            <span>{payload.roomName}</span>
            <span>{payload.members.length}/2</span>
        </div>
    );
}



export default RoomCard
