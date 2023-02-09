import io, { Socket } from 'socket.io-client';

//connect to socket
const liveURL = 'https://connect-backend-production-59fc.up.railway.app';
const localURL = 'http://localhost:9000';

export const socket: Socket<any> = io(liveURL);
