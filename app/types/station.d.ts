import type { Line } from "./line";

export type CachedStation = {
  id: number;
  lines: Line[];
  title: string;
};

export type Station = {
  name: string;
  description: string;
  id: number;
  location: {
    latitude: number;
    longitude: number;
  };
  stops: [
    {
      id: number;
      direction: string;
      name: string;
      accessible: boolean;
      lines: Line[];
    }
  ];
  lines: Line[];
  accessible: boolean;
};
