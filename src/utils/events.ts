import { io } from '..';

export const emitEvent = (event: string, data?: any) => {
  io.emit(event, data);
};
