import { Controller } from './Controller';
import { quizzService } from '../services/QuizzService';

class QuizzController extends Controller {}

export const quizzController = new QuizzController(quizzService);
