import React, { useEffect } from 'react'
import { RoomCard } from '../'
import socketIOClient from 'socket.io-client';

const JoinBox = () => {
    const socket = socketIOClient('http://localhost:8000', { transports: ['websocket'] });
    useEffect(() => {
        
        socket.on('rooms', (data) => {
            console.log(data)
        })
        
    }, []);

    const createRoomClick = (e) => {
        socket.emit('newRoom')
    }

    return (
        <div className='joinbox'>
                <div className='joinbox-left'>
                    <h2>Rooms</h2>
                    <RoomCard/>
                    <RoomCard/>
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
