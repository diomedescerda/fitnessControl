export interface RunningSession {
  id: string;
  userId: string;
  date: string;
  distance: number;
  duration: string;
  avgPace: string;
  avgHeartRate?: number;
  maxHeartRate?: number;
  caloriesBurned?: number;
  notes?: string;
}
