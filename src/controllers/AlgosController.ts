import { Controller } from './Controller';
import { algoService } from '../services/AlgoService';

class AlgoController extends Controller {}

export const algoController = new AlgoController(algoService);
