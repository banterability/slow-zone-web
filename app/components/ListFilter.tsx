import { Lines } from "./Lines";
import type { Line } from "~/types/station";

type ListFilterProps = {
  lines: [Line];
  visibleLines: [Line];
  onLineClick: () => {};
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
