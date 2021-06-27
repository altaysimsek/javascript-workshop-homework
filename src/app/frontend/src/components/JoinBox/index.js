import React, { useEffect, useState } from 'react'
import { RoomCard } from '../'
import socket from '../../socket';


const JoinBox = () => {
    
    const [rooms, setRooms] = useState([])
    
    
    useEffect(() => {
        
        socket.on('rooms', (data) => {
            setRooms(data)
        })

        return () => socket.disconnect();
        
    }, []);
    
    const createRoomClick = (e) => {
        const retVal = prompt('Enter your name : ', 'your name here');
        socket.emit('newRoom', retVal)
    }

    return (
        <div className='joinbox'>
                <div className='joinbox-left'>
                    <h2>Rooms</h2>
                    {rooms.map((room, idx) => <RoomCard key={idx} payload={room}/>)}
                </div>
                <div className='joinbox-right'>
                    <h2>Settings</h2>
                    <hr/>
                    <input placeholder="Type your username"></input>
                    <hr/>
                    <div>
                        <button disabled>Join Room</button>
                        <button onClick={createRoomClick}>Create Room</button>
                    </div>
                </div>
            </div>
    )
}

export default JoinBox
