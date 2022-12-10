export enum Direction {
  N,
  S,
  E,
  W,
}

export enum Line {
  blue,
  brown,
  green,
  orange,
  pink,
  purple,
  red,
  yellow,
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
  lines: [Line];
};

export type Station = {
  name: string;
  description: string;
  id: number;
  location: Location;
  stops: [Stop];
  lines: [Line];
  accessible: boolean;
};
