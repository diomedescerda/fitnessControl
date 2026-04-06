import { WorkoutExercise } from '../interfaces/workout-exercise.interface';

export interface WorkoutSession {
    id: string;
    userId: string;
    date: string;
    notes: string;
    workoutExercises: WorkoutExercise[];
}
