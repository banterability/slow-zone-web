export function StaticMap({ stationId }: { stationId: number }) {
  return (
    <div
      className="static-map"
      style={{
        backgroundImage: `url(/stations/${stationId}/map)`,
      }}
    />
  );
}
