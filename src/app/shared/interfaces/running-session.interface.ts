export interface RunningSession {
  id: number;
  sessionDate: string;
  distance: number;
  distanceUnit: string;
  duration: string;
  avgHeartRate?: number;
  maxHeartRate?: number;
  caloriesBurned?: number;
  notes?: string;
}
