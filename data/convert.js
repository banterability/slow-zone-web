const fs = require("fs");
const {every, flatten, uniq} = require("lodash");

const data = require(`${__dirname}/stations-raw.json`);

const buildLocation = locationString => {
  let [latitude, longitude] = locationString.match(/([\d-.]+)/g);

  latitude = parseFloat(latitude, 10);
  longitude = parseFloat(longitude, 10);

  return {latitude, longitude};
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
  // console.log(stop);
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

  // sort lines by a-z
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

const byStation = data.reduce((memo, stop) => {
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
  // sort stops by id
  data.stops = data.stops.sort((a, b) => (a.id > b.id ? 1 : -1));

  return data;
});

fs.writeFileSync(
  `${__dirname}/stations.json`,
  JSON.stringify({
    stations: summarize,
    generatedAt: new Date().toISOString().split("T")[0]
  })
);
