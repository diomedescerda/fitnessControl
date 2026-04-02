export interface BodyMeasurement {
    id: string;
    userId: string;
    date: string;
    weight: number;
    chest?: number;
    waist?: number;
    hips?: number;
    bicep?: number;
    thigh?: number;
    calf?: number;
    notes?: string;
}
