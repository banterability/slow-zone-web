const MIN_RAIL_STATIONS = 100;
const RAIL_STATION_ID = /^4\d{4}$/;
const RAIL_PLATFORM_ID = /^3\d{4}$/;
const WHEELCHAIR_BOARDING = { 1: true, 2: false };

export const splitCsvLine = line => {
  const fields = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (quoted && char === '"' && line[i + 1] === '"') {
      field += '"';
      i++;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      fields.push(field);
      field = '';
    } else {
      field += char;
    }
  }

  fields.push(field);
  return fields;
};

export const parseCsv = text => {
  const [header = '', ...lines] = text.split(/\r?\n/).filter(line => line !== '');
  const columns = splitCsvLine(header);

  return lines.map(line => {
    const fields = splitCsvLine(line);
    return Object.fromEntries(columns.map((column, index) => [column, fields[index] ?? '']));
  });
};

export const rollUpStation = station => ({
  ...station,
  stops: [...station.stops].sort((a, b) => (a.id > b.id ? 1 : -1)),
  lines: [...new Set(station.stops.flatMap(stop => stop.lines))].sort(),
  accessible: station.stops.every(stop => stop.accessible)
});

const isRailStation = row => row.location_type === '1' && RAIL_STATION_ID.test(row.stop_id);

const isRailPlatform = row =>
  row.location_type === '0' &&
  RAIL_PLATFORM_ID.test(row.stop_id) &&
  RAIL_STATION_ID.test(row.parent_station);

export const applyGtfs = (stations, rows) => {
  const gtfsStations = rows.filter(isRailStation);
  if (gtfsStations.length < MIN_RAIL_STATIONS) {
    throw new Error(
      `GTFS stops.txt lists ${gtfsStations.length} rail stations; expected at least ${MIN_RAIL_STATIONS}. Not updating station data.`
    );
  }

  const gtfsPlatforms = rows.filter(isRailPlatform);
  const platformsById = new Map(gtfsPlatforms.map(row => [parseInt(row.stop_id, 10), row]));
  const changes = { dropped: [], accessibility: [], notInPortal: [] };

  const corrected = stations.flatMap(station => {
    const droppedStops = [];
    const changedStops = [];

    const stops = station.stops.flatMap(stop => {
      const platform = platformsById.get(stop.id);
      if (!platform) {
        droppedStops.push({ kind: 'Platform', id: stop.id, name: stop.name });
        return [];
      }

      const accessible = WHEELCHAIR_BOARDING[platform.wheelchair_boarding] ?? stop.accessible;
      if (accessible !== stop.accessible) {
        changedStops.push({ kind: 'Platform', id: stop.id, name: stop.name, accessible });
      }
      return [{ ...stop, accessible }];
    });

    if (stops.length === 0) {
      changes.dropped.push(
        { kind: 'Station', id: station.id, name: station.description },
        ...droppedStops
      );
      return [];
    }

    const updated = rollUpStation({ ...station, stops });
    changes.dropped.push(...droppedStops);
    if (updated.accessible !== station.accessible) {
      changes.accessibility.push({
        kind: 'Station',
        id: station.id,
        name: station.description,
        accessible: updated.accessible
      });
    }
    changes.accessibility.push(...changedStops);
    return [updated];
  });

  const portalStationIds = new Set(stations.map(station => station.id));
  const portalStopIds = new Set(stations.flatMap(station => station.stops.map(stop => stop.id)));
  changes.notInPortal = [
    ...gtfsStations
      .filter(row => !portalStationIds.has(parseInt(row.stop_id, 10)))
      .map(row => ({ kind: 'Station', id: parseInt(row.stop_id, 10), name: row.stop_name })),
    ...gtfsPlatforms
      .filter(row => !portalStopIds.has(parseInt(row.stop_id, 10)))
      .map(row => ({ kind: 'Platform', id: parseInt(row.stop_id, 10), name: row.stop_name }))
  ];

  return { stations: corrected, changes };
};

const describeEntry = ({ kind, id, name }) => `- ${kind} ${id}, ${name}`;

const describeAccessibility = entry =>
  `${describeEntry(entry)}: ${entry.accessible ? 'now accessible' : 'no longer accessible'}`;

const section = (heading, lines) => [
  `### ${heading}`,
  '',
  ...(lines.length > 0 ? lines : ['None']),
  ''
];

export const buildSummary = (changes, lastModified) => {
  const feed = lastModified ? `Last-Modified ${lastModified}` : 'no Last-Modified header';

  return [
    `Station data comes from the Chicago Data Portal's "List of 'L' Stops", corrected against the CTA's GTFS feed (${feed}).`,
    '',
    ...section("Dropped because GTFS doesn't list them", changes.dropped.map(describeEntry)),
    ...section(
      'Accessibility changed to match GTFS',
      changes.accessibility.map(describeAccessibility)
    ),
    ...section(
      'In GTFS but not the portal, so not added',
      changes.notInPortal.map(describeEntry)
    )
  ].join('\n');
};
