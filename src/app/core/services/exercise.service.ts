import { Injectable } from '@angular/core';
import { Exercise } from '../../shared/interfaces/exercise.interface'

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private readonly apiUrl = 'http://localhost:8080/api/Exercises';

  async getAll(): Promise<Exercise[]> {
    const response = await fetch(this.apiUrl);
    return response.json();
  }

  async getById(id: string): Promise<Exercise> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    return response.json();
  }

  async create(exercise: Omit<Exercise, 'id'>): Promise<Exercise> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise)
    });
    return response.json();
  }

  async update(id: string, exercise: Partial<Exercise>): Promise<Exercise> {
    const response = await fetch(`${this.apiUrl}/${id}`,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise)
    });
    return response.json();
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' });
  }
}
