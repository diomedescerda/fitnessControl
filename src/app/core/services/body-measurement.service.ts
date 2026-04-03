import { Injectable } from '@angular/core';
import { BodyMeasurement } from '../../shared/interfaces/body-measurement.interface'

@Injectable({
  providedIn: 'root',
})
export class BodyMeasurementService {
    private readonly apiUrl = 'http://localhost:8080/api/BodyMeasurements';

    async getAll(): Promise<BodyMeasurement[]> {
      const response = await fetch(this.apiUrl);
      return response.json();
    }

    async getById(id: string): Promise<BodyMeasurement[]> {
      const response = await fetch(`${this.apiUrl}/${id}`);
      return response.json();
    }

    async getMostRecentByUserId(userId: string): Promise<BodyMeasurement | null> {
      const response = await fetch(`${this.apiUrl}/recent/${userId}`);
      if (!response.ok) return null;
      return response.json();
    }

    async create(measurement: Omit<BodyMeasurement, 'id' | 'createdAt'>): Promise<BodyMeasurement> {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(measurement)
      });
      return response.json();
    }

    async update(id: string, measurement: Partial<BodyMeasurement>): Promise<BodyMeasurement> {
      const response = await fetch(`${this.apiUrl}/${id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(measurement)
      });
      return response.json();
    }

    async delete(id: string): Promise<void> {
      await fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' });
    }
}
