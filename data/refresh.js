import * as fs from 'node:fs';

const API_URL = 'https://data.cityofchicago.org/resource/8pix-ypme.json';
const API_TOKEN = process.env.CHICAGO_DATA_PORTAL_APP_TOKEN;

if (!API_TOKEN) {
  console.error('CHICAGO_DATA_PORTAL_APP_TOKEN environment variable is required');
  process.exit(1);
}

async function fetchStationData() {
  try {
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

    const transformedData = apiData.map(record => ({
      STOP_ID: parseInt(record.stop_id),
      DIRECTION_ID: record.direction_id,
      STOP_NAME: record.stop_name,
      STATION_NAME: record.station_name,
      STATION_DESCRIPTIVE_NAME: record.station_descriptive_name,
      MAP_ID: parseInt(record.map_id),
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
    }));

    // Write the transformed data to stations-raw.json
    fs.writeFileSync('data/stations-raw.json', JSON.stringify(transformedData, null, 2));
    console.log(`Successfully downloaded and transformed ${transformedData.length} station records`);

  } catch (error) {
    console.error('Failed to fetch station data:', error);
    process.exit(1);
  }
}

fetchStationData();