import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:8000', { transports: ['websocket'] });

export default socket