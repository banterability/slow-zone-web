import { Link } from "react-router";

import { Lines } from "./Lines";

import type { Line } from "~/types/line";

type Props = {
  id: number;
  name: string;
  lines: Line[];
  distance?: { feet: number; miles: number };
};

function formatDistance({ feet, miles }: { feet: number; miles: number }) {
  if (feet < 1500) {
    return `${Math.round(feet)} feet`;
  }
  return `${miles.toFixed(1)} miles`;
}

export function StationListItem({ id, name, lines, distance }: Props) {
  return (
    <li>
      <Link
        className="station-list-item"
        to={`/stations/${id}`}
        prefetch="intent"
      >
        <div>
          <p className="station-list-item-name">{name}</p>
          {distance ? (
            <p className="station-list-item-distance">
              {formatDistance(distance)}
            </p>
          ) : null}
        </div>
        <Lines lines={lines} />
      </Link>
    </li>
  );
}
