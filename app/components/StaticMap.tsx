const API_KEY = process.env.GOOGLE_MAPS_STATIC_API_KEY;
const BASE_URL = "https://maps.googleapis.com/maps/api/staticmap";
const LATITUDE_OFFSET = 0.0005;

type StaticMapProps = {
  height: number;
  key: string;
  latitude: number;
  longitude: number;
  scale: number;
  width: number;
  zoom: number;
};

function query(options) {
  const { latitude, longitude, width, height, ...rest } = options;

  const urlSearchParms = new URLSearchParams();

  Object.keys(rest).forEach((key) => {
    urlSearchParms.append(key, rest[key]);
  });

  urlSearchParms.append("center", `${latitude + LATITUDE_OFFSET},${longitude}`);
  urlSearchParms.append("size", `${width}x${height}`);

  return urlSearchParms.toString();
}

export function StaticMap(props: StaticMapProps) {
  const mapUrl = `${BASE_URL}?${query(props)}`;

  return (
    <div
      className="static-map"
      style={{
        backgroundImage: `url('${mapUrl}')`,
      }}
    />
  );
}

StaticMap.defaultProps = {
  key: API_KEY,
  scale: 2,
  zoom: 16,
};
