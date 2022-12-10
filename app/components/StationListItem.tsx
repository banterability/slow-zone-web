import { Link } from "@remix-run/react";
import { Lines } from "./Lines";
import type { Line } from "~/types/station";

type Props = {
  id: number;
  name: string;
  lines: [Line];
};

export function StationListItem({ id, name, lines }: Props) {
  return (
    <li>
      <Link className="station-list__item" to={`/stations/${id}`}>
        <p className="station-list__item__name">{name}</p>
        <Lines lines={lines} />
      </Link>
    </li>
  );
}