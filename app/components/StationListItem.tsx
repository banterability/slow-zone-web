import { Link } from "@remix-run/react";

import { Lines } from "./Lines";
import type { Line } from "~/types/line";

type StationListItemProps = {
  id: number;
  name: string;
  lines: Line[];
};

export function StationListItem({ id, name, lines }: StationListItemProps) {
  return (
    <li>
      <Link className="station-list__item" to={`/stations/${id}`}>
        <p className="station-list__item__name">{name}</p>
        <Lines lines={lines} />
      </Link>
    </li>
  );
}
