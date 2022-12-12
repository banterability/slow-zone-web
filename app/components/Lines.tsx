import { clsx } from "clsx";

import type { Line } from "~/types/line";

type LinesProps = {
  lines: Line[];
  activeLines?: Line[];
  onLineClick?: (line: Line) => void;
};

export function Lines({ lines, activeLines = lines, onLineClick }: LinesProps) {
  return (
    <div className="lines">
      {lines.map((line) => (
        <div
          className={clsx(`line cta-${line}`, {
            "line--hidden": !activeLines.includes(line),
            "line--clickable": Boolean(onLineClick),
          })}
          key={line}
          {...(onLineClick && { onClick: () => onLineClick(line) })}
        />
      ))}
    </div>
  );
}
