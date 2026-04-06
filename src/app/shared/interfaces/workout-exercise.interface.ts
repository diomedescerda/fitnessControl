import { ExerciseSet } from '../interfaces/exercise-set.interface';

export interface WorkoutExercise {
    id: string;
    workoutSessionId: string;
    exerciseId: string;
    orderNumber: string;
    notes: string;
    exerciseSets: ExerciseSet[];
}
