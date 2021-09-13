import { Service } from './Service';
import { Algo } from '../models/Algo';

class AlgoService extends Service {}

export const algoService = new AlgoService(Algo);
