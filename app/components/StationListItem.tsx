import { Link } from "react-router";

import { Lines } from "./Lines";

import type { Line } from "~/types/line";

type Props = {
  id: number;
  name: string;
  lines: Line[];
};

export function StationListItem({ id, name, lines }: Props) {
  return (
    <li>
      <Link
        className="station-list-item"
        to={`/stations/${id}`}
        prefetch="intent"
      >
        <p className="station-list-item-name">{name}</p>
        <Lines lines={lines} />
      </Link>
    </li>
  );
}
