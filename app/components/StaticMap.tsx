export function StaticMap({ stationId }: { stationId: string }) {
  return (
    <div
      className="static-map"
      style={{
        backgroundImage: `url(/stations/${stationId}/map)`,
      }}
    />
  );
}
