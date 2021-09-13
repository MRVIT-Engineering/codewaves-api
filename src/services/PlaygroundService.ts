import { Playground } from '../models/Playground';

import { Service } from './Service';

class PlaygroundService extends Service {
  getAllByUser(id: string) {
    return Playground.find({ userId: id });
  }
}

export const playgroundService = new PlaygroundService(Playground);
