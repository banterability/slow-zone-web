import { Lines } from "./Lines";
import type { Line } from "~/types/line";

type Props = {
  lines: Line[];
  visibleLines: Line[];
  onLineClick: (line: Line) => void;
};

export function ListFilter({ lines, visibleLines, onLineClick }: Props) {
  return (
    <Lines lines={lines} activeLines={visibleLines} onLineClick={onLineClick} />
  );
}
