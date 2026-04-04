import { Injectable } from '@angular/core';
import { RunningSession } from '../../shared/interfaces/running-session.interface'

@Injectable({
  providedIn: 'root',
})
export class RunningSessionService {
  private readonly apiUrl = 'http://localhost:8080/api/RunningSessions';

  async getAll(): Promise<RunningSession[]> {
    const response = await fetch(this.apiUrl);
    return response.json();
  }

  async getById(id: string): Promise<RunningSession> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    return response.json();
  }

  async create(runningSession: Omit<RunningSession, 'id' | 'avgPace'>): Promise<RunningSession> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(runningSession)
    });
    return response.json();
  }

  async update(id: string, runningSession: Partial<RunningSession>): Promise<RunningSession> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(runningSession)
    });
    return response.json();
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' });
  }
}
