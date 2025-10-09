import * as fs from 'node:fs';
import { every, flatten, uniq } from "lodash-es";

const API_URL = 'https://data.cityofchicago.org/resource/8pix-ypme.json';
const API_TOKEN = process.env.CHICAGO_DATA_PORTAL_APP_TOKEN;

if (!API_TOKEN) {
  console.error('CHICAGO_DATA_PORTAL_APP_TOKEN environment variable is required');
  process.exit(1);
}

const buildLocation = locationString => {
  let [latitude, longitude] = locationString.match(/([\d-.]+)/g);

  latitude = parseFloat(latitude, 10);
  longitude = parseFloat(longitude, 10);

  return { latitude, longitude };
};

const toBoolean = value => {
  if (value === true) {
    return true;
  } else if (value === false) {
    return false;
  } else if (value === "true") {
    return true;
  } else if (value === "false" || value === "") {
    return false;
  } else {
    throw new Error("unknown value toBoolean: " + value);
  }
};

const buildStop = stop => {
  const stopData = {
    id: parseInt(stop.STOP_ID, 10),
    direction: stop.DIRECTION_ID,
    name: stop.STOP_NAME,
    accessible: toBoolean(stop.ADA),
    lines: []
  };

  if (toBoolean(stop.BLUE)) stopData.lines.push("blue");
  if (toBoolean(stop.RED)) stopData.lines.push("red");
  if (toBoolean(stop.G)) stopData.lines.push("green");
  if (toBoolean(stop.BRN)) stopData.lines.push("brown");
  if (toBoolean(stop.P) || toBoolean(stop.Pexp)) stopData.lines.push("purple");
  if (toBoolean(stop.Y)) stopData.lines.push("yellow");
  if (toBoolean(stop.Pnk)) stopData.lines.push("pink");
  if (toBoolean(stop.O)) stopData.lines.push("orange");

  stopData.lines = stopData.lines.sort();

  return stopData;
};

const buildStation = stop => {
  return {
    name: stop.STATION_NAME,
    description: stop.STATION_DESCRIPTIVE_NAME,
    id: parseInt(stop.MAP_ID, 10),
    location: buildLocation(stop.Location),
    stops: []
  };
};

const transformRecord = record => ({
  STOP_ID: parseInt(record.stop_id, 10),
  DIRECTION_ID: record.direction_id,
  STOP_NAME: record.stop_name,
  STATION_NAME: record.station_name,
  STATION_DESCRIPTIVE_NAME: record.station_descriptive_name,
  MAP_ID: parseInt(record.map_id, 10),
  ADA: record.ada,
  RED: record.red,
  BLUE: record.blue,
  G: record.g,
  BRN: record.brn,
  P: record.p,
  Pexp: record.pexp,
  Y: record.y,
  Pnk: record.pnk,
  O: record.o,
  Location: `(${record.location.latitude}, ${record.location.longitude})`
});

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

  const transformedData = apiData.map(transformRecord);

  const byStation = transformedData.reduce((memo, stop) => {
    const stationId = parseInt(stop.MAP_ID, 10);
    let stationData;

    console.log("stop before BuildStop", stop);

    const stopData = buildStop(stop);

    if (memo[stationId]) {
      stationData = memo[stationId];
      console.log(
        "--> adding stop",
        stop.STOP_NAME,
        "to existing station",
        stop.STATION_NAME
      );
    } else {
      stationData = buildStation(stop);
      console.log(
        "> Adding station",
        stop.STATION_NAME,
        "and stop",
        stop.STOP_NAME
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