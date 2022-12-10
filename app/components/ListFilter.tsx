import { Lines } from "./Lines";

type ListFilterProps = {
  lines: [string];
  visibleLines: [string];
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
