import { Injectable } from '@angular/core';
import { WorkoutSession } from '../../shared/interfaces/workout-session.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkoutSessionService {
  private readonly apiUrl = 'http://localhost:8080/api/WorkoutSessions';

  async getAll(): Promise<WorkoutSession[]> {
    const response = await fetch(this.apiUrl);
    return response.json();
  }

  async getById(id: string): Promise<WorkoutSession> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    return response.json();
  }

  async getNoGymSessionsByUserIdAndOffset(id: string, offset: number) {
    const response = await fetch(`${this.apiUrl}/noGymSessions/${id}/${offset}`);
    return response.json();
  }

  async getLastWorkoutSessionsByUserIdAndN(id: string, n: number): Promise<WorkoutSession[]> {
    const response = await fetch(`${this.apiUrl}/recent/${id}/${n}`);
    return response.json();
  }

  async create(workoutSession: Omit<WorkoutSession, 'id'>): Promise<WorkoutSession> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutSession)
    });
    return response.json();
  }

  async update(id: string, workoutSession: Partial<WorkoutSession>): Promise<WorkoutSession> {
    const response = await fetch(`${this.apiUrl}/${id}`,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutSession)
    });
    return response.json();
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' });
  }
}
