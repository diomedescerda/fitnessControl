export interface ExerciseSet {
    id: string;
    workoutExerciseId: string;
    setNumber: number;
    reps: number;
    weight: number;
    comment?: string;
}
