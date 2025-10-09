import * as fs from 'node:fs';
import { every, flatten, uniq } from "lodash-es";

const API_URL = 'https://data.cityofchicago.org/resource/8pix-ypme.json';
const API_TOKEN = process.env.CHICAGO_DATA_PORTAL_APP_TOKEN;

if (!API_TOKEN) {
  console.error('CHICAGO_DATA_PORTAL_APP_TOKEN environment variable is required');
  process.exit(1);
}

const normalizeWhitespace = str => str.replace(/\s+/g, ' ');

const buildStop = station => {
  const stopData = {
    id: parseInt(station.stop_id, 10),
    direction: station.direction_id,
    name: normalizeWhitespace(station.stop_name),
    accessible: station.ada,
    lines: []
  };

  if (station.blue) stopData.lines.push("blue");
  if (station.red) stopData.lines.push("red");
  if (station.g) stopData.lines.push("green");
  if (station.brn) stopData.lines.push("brown");
  if (station.p || station.pexp) stopData.lines.push("purple");
  if (station.y) stopData.lines.push("yellow");
  if (station.pnk) stopData.lines.push("pink");
  if (station.o) stopData.lines.push("orange");

  stopData.lines = stopData.lines.sort();

  return stopData;
};

const buildStation = station => {
  return {
    name: normalizeWhitespace(station.station_name),
    description: normalizeWhitespace(station.station_descriptive_name),
    id: parseInt(station.map_id, 10),
    location: {
      latitude: parseFloat(station.location.latitude),
      longitude: parseFloat(station.location.longitude)
    },
    stops: []
  };
};

const updateStationData = async () => {
  console.log('Fetching data from Chicago Data Portal...');

  const response = await fetch(`${API_URL}?$limit=50000`, {
    headers: {
      'X-App-Token': API_TOKEN
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const apiData = await response.json();
  console.log(`Fetched ${apiData.length} records from API`);

  const byStation = apiData.reduce((memo, stop) => {
    const stationId = parseInt(stop.map_id, 10);
    let stationData;

    console.log("stop before BuildStop", stop);

    const stopData = buildStop(stop);

    if (memo[stationId]) {
      stationData = memo[stationId];
      console.log(
        "--> adding stop",
        stop.stop_name,
        "to existing station",
        stop.station_name
      );
    } else {
      stationData = buildStation(stop);
      console.log(
        "> Adding station",
        stop.station_name,
        "and stop",
        stop.stop_name
      );
    }

    stationData.stops.push(stopData);
    memo[stationId] = stationData;
    return memo;
  }, {});

  const summarize = Object.keys(byStation).map(stationId => {
    const data = byStation[stationId];
    data.lines = uniq(flatten(data.stops.map(stop => stop.lines))).sort();
    data.accessible = every(
      data.stops.map(stop => stop.accessible),
      accessible => accessible
    );
    data.stops = data.stops.sort((a, b) => (a.id > b.id ? 1 : -1));

    return data;
  });

  fs.writeFileSync(
    `app/data/stations.json`,
    JSON.stringify({
      stations: summarize,
      generatedAt: new Date().toISOString().split("T")[0]
    })
  );

  console.log(`Successfully processed ${summarize.length} stations`);
};

try {
  await updateStationData();
} catch (error) {
  console.error('Failed to update station data:', error);
  process.exit(1);
}