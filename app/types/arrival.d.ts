import type { Line } from "./line";

type DirectionId = 1 | 5;
type RouteId = "Red" | "Blue" | "Brn" | "G" | "Org" | "P" | "Pink" | "Y";

type Destination = {
  id: number;
  name: string;
};

type Prediction = {
  arrivalMinutes: number;
  arrivalString: string;
  arrivalTime: string;
  predictionAge: number;
  predictionTime: string;
};

type Route = {
  class: Line;
  directionId: DirectionId;
  id: RouteId;
  name: Line;
  run: number;
};
type Stop = {
  id: number;
  description: string;
};
type Station = {
  id: number;
  name: string;
  stop: Stop;
};

export type Arrival = {
  destination: Destination;
  location: Location;
  prediction: Prediction;
  station: Station;
  route: Route;
  status: {
    approaching: boolean;
    delayed: boolean;
    faulty: boolean;
    scheduled: boolean;
  };
};
