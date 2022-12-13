import type { Line } from "./line";

type RouteId = "Red" | "Blue" | "Brn" | "G" | "Org" | "P" | "Pink" | "Y";

export type Arrival = {
  destination: {
    id: number;
    name: string;
  };
  location: {
    latitude: number;
    longitude: number;
    heading: number;
  };
  prediction: {
    arrivalMinutes: number;
    arrivalString: string;
    arrivalTime: string;
    predictionAge: number;
    predictionTime: string;
  };
  station: {
    id: number;
    name: string;
    stop: { id: number; description: string };
  };
  route: {
    class: Line;
    directionId: 1 | 5;
    id: RouteId;
    name: Line;
    run: number;
  };
  status: {
    approaching: boolean;
    delayed: boolean;
    faulty: boolean;
    scheduled: boolean;
  };
};
