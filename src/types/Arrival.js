// @flow

import type {Location} from "./Location";

export type Arrival = {
  destination: {
    id: number,
    name: string
  },
  location: Location,
  prediction: {
    arrivalMinutes: number,
    arrivalString: string,
    arrivalTime: string,
    predictionAge: number,
    predictionTime: string
  },
  route: {
    class: string,
    directionId: number,
    id: string,
    name: string,
    run: number
  },
  station: {
    id: number,
    name: string,
    stop: {
      id: number,
      description: string
    }
  },
  status: {
    approaching: boolean,
    delayed: boolean,
    faulty: boolean,
    scheduled: boolean
  }
};
