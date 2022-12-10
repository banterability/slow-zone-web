export enum Direction {
  N,
  S,
  E,
  W,
}

export type Location = {
  latitude: number;
  longitude: number;
};

export type Stop = {
  id: number;
  direction: Direction;
  name: string;
  accessible: boolean;
  lines: [string];
};

export type Station = {
  name: string;
  description: string;
  id: number;
  location: Location;
  stops: [Stop];
  lines: [string];
  accessible: boolean;
};
