import { Server } from 'socket.io';

export const configSocketIO = (io: Server) => {
  io.on('connection', () => {
    io.emit('connection');
  });
};
