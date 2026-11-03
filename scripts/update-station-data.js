import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { applyGtfs, buildSummary, parseCsv, rollUpStation } from './gtfs.js';

const API_TOKEN = process.env.CHICAGO_DATA_PORTAL_APP_TOKEN;
if (!API_TOKEN) {
  console.error('CHICAGO_DATA_PORTAL_APP_TOKEN environment variable is required');
  process.exit(1);
}

const GTFS_URL = 'https://www.transitchicago.com/downloads/sch_data/google_transit.zip';
const SUMMARY_PATH = process.env.STATION_DATA_SUMMARY_PATH;

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

const fetchGtfsStops = async () => {
  console.log('Fetching GTFS feed from CTA...');

  const response = await fetch(GTFS_URL);
  if (!response.ok) {
    throw new Error(`Couldn't download the GTFS feed: HTTP status ${response.status}`);
  }

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cta-gtfs-'));
  try {
    const zipPath = path.join(dir, 'google_transit.zip');
    fs.writeFileSync(zipPath, new Uint8Array(await response.arrayBuffer()));

    let stops;
    try {
      // stops.txt is over a megabyte, past execFileSync's default maxBuffer.
      stops = execFileSync('unzip', ['-p', zipPath, 'stops.txt'], {
        encoding: 'utf8',
        maxBuffer: 16 * 1024 * 1024
      });
    } catch (error) {
      throw new Error(`Couldn't read stops.txt from the GTFS feed: ${error.message}`, {
        cause: error
      });
    }

    const rows = parseCsv(stops);
    console.log(`Read ${rows.length} rows from GTFS stops.txt`);

    return { rows, lastModified: response.headers.get('last-modified') };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
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

  const summarize = Object.keys(byStation).map(stationId => rollUpStation(byStation[stationId]));

  const gtfs = await fetchGtfsStops();
  const { stations, changes } = applyGtfs(summarize, gtfs.rows);
  const summary = buildSummary(changes, gtfs.lastModified);

  fs.writeFileSync(
    `app/data/stations.json`,
    JSON.stringify({
      stations
    })
  );

  if (SUMMARY_PATH) {
    fs.writeFileSync(SUMMARY_PATH, summary);
  }
  console.log(summary);

  console.log(`Successfully processed ${stations.length} stations`);
};

try {
  await updateStationData();
} catch (error) {
  console.error('Failed to update station data:', error);
  process.exit(1);
}