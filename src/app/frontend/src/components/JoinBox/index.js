import React, { useEffect, useState } from 'react'
import { RoomCard } from '../'
import socket from '../../socket';

//Redux
import { useSelector } from 'react-redux'


const JoinBox = () => {
    const roomie = useSelector(state => state.rooms)
    
    const [rooms, setRooms] = useState([])
    
    useEffect(() => {
        socket.on('rooms', (data) => {
            setRooms(data)
        })
        socket.on('message', (data) => {
            console.log(data)
        });
        return () => socket.disconnect();
    }, []);
    
    const handleCreateRoomClick = (e) => {
        const retVal = prompt('Enter your room name : ', 'Room name here!');
        socket.emit('newRoom', retVal)
    }
    const handleJoinRoomClick = (e) => {
        socket.emit('joinRoom', roomie.selectedRoom)
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
                        <button disabled={!roomie.selectedRoom} onClick={handleJoinRoomClick}>Join Room</button>
                        <button onClick={handleCreateRoomClick}>Create Room</button>
                    </div>
                </div>
            </div>
    )
}

export default JoinBox
