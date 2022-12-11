import classNames from "classnames";

type LinesProps = {
  lines: string[];
  activeLines?: string[];
  onLineClick?: (line: string) => void;
};

export function Lines({ lines, activeLines = lines, onLineClick }: LinesProps) {
  return (
    <div className="lines">
      {lines.map((line: string) => (
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
