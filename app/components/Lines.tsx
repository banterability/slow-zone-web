import classNames from "classnames";
import { Line } from "~/types/station";

type LinesProps = {
  lines: [Line];
  activeLines?: [Line];
  onLineClick?: () => {};
};

export function Lines({ lines, activeLines = lines, onLineClick }: LinesProps) {
  return (
    <div className="lines">
      {lines.map((line: Line) => (
        <div
          className={classNames(`line cta-${line}`, {
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
