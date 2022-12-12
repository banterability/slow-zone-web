import { Lines } from "./Lines";
import type { Line } from "~/types/line";

type ListFilterProps = {
  lines: Line[];
  visibleLines: Line[];
  onLineClick: (line: Line) => void;
};

export function ListFilter({
  lines,
  visibleLines,
  onLineClick,
}: ListFilterProps) {
  return (
    <Lines lines={lines} activeLines={visibleLines} onLineClick={onLineClick} />
  );
}
