export function Lines({ lines }) {
  return (
    <div className="lines">
      {lines.map((line, index) => (
        <div className={`line cta-${line}`} key={line} />
      ))}
    </div>
  );
}
