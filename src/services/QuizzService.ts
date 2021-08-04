import { Service } from './Service';
import { Quizz } from '../models/schemas/Quizz';

class QuizzService extends Service {}

export const quizzService = new QuizzService(Quizz);
