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
  class: string;
  directionId: number;
  id: string;
  name: string;
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
