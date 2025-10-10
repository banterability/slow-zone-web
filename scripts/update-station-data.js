import * as fs from 'node:fs';

const API_TOKEN = process.env.CHICAGO_DATA_PORTAL_APP_TOKEN;
if (!API_TOKEN) {
  console.error('CHICAGO_DATA_PORTAL_APP_TOKEN environment variable is required');
  process.exit(1);
}

const normalizeWhitespace = str => str.replace(/\s+/g, ' ');

const buildStop = stop => {
  const stopData = {
    id: parseInt(stop.stop_id, 10),
    direction: stop.direction_id,
    name: normalizeWhitespace(stop.stop_name),
    accessible: stop.ada,
    lines: []
  };

  if (stop.blue) stopData.lines.push("blue");
  if (stop.red) stopData.lines.push("red");
  if (stop.g) stopData.lines.push("green");
  if (stop.brn) stopData.lines.push("brown");
  if (stop.p || stop.pexp) stopData.lines.push("purple");
  if (stop.y) stopData.lines.push("yellow");
  if (stop.pnk) stopData.lines.push("pink");
  if (stop.o) stopData.lines.push("orange");

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

  const response = await fetch('https://data.cityofchicago.org/resource/8pix-ypme.json', {
    headers: { 'X-App-Token': API_TOKEN }
  });

  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    process.exit(1);
  }

  const apiData = await response.json();
  console.log(`Fetched ${apiData.length} records from API`);

  const byStation = apiData.reduce((memo, stop) => {
    const stationId = parseInt(stop.map_id, 10);
    let stationData;

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
    data.lines = [...new Set(data.stops.flatMap(stop => stop.lines))].sort();
    data.accessible = data.stops.every(stop => stop.accessible);
    data.stops = data.stops.sort((a, b) => (a.id > b.id ? 1 : -1));

    return data;
  });

  fs.writeFileSync(
    `app/data/stations.json`,
    JSON.stringify({
      stations: summarize
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