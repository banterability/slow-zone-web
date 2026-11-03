import { describe, expect, it } from "vitest";

import {
  applyGtfs,
  buildSummary,
  parseCsv,
  splitCsvLine,
} from "../../scripts/gtfs.js";

import type { Station } from "~/types/station";

type Row = Record<string, string>;
type FixtureStop = {
  id: number;
  name?: string;
  accessible: boolean;
  lines?: string[];
};

const station = (id: number, description: string, stops: FixtureStop[]) => {
  const built = stops.map((stop) => ({
    id: stop.id,
    direction: "N",
    name: stop.name ?? `Platform ${stop.id}`,
    accessible: stop.accessible,
    lines: stop.lines ?? ["red"],
  }));
  return {
    name: description,
    description,
    id,
    location: { latitude: 41.88, longitude: -87.63 },
    stops: built,
    lines: [...new Set(built.flatMap((stop) => stop.lines))].sort(),
    accessible: built.every((stop) => stop.accessible),
  };
};

const gtfsStation = (id: number, name = `GTFS station ${id}`): Row => ({
  stop_id: String(id),
  stop_name: name,
  location_type: "1",
  parent_station: "",
  wheelchair_boarding: "1",
});

const gtfsPlatform = (
  id: number,
  parent: number,
  wheelchairBoarding: string,
  name = `GTFS platform ${id}`,
): Row => ({
  stop_id: String(id),
  stop_name: name,
  location_type: "0",
  parent_station: String(parent),
  wheelchair_boarding: wheelchairBoarding,
});

// The feed guard wants at least 100 rail stations, so each case runs alongside
// stations the portal and GTFS agree on.
const filler = (count: number) => {
  const indexes = Array.from({ length: count }, (_, index) => index);
  return {
    stations: indexes.map((index) =>
      station(49000 + index, `Filler ${index}`, [
        { id: 39000 + index, accessible: true },
      ]),
    ),
    rows: indexes.flatMap((index) => [
      gtfsStation(49000 + index),
      gtfsPlatform(39000 + index, 49000 + index, "1"),
    ]),
  };
};

const FILLER = filler(100);

const apply = (stations: ReturnType<typeof station>[], rows: Row[]) =>
  applyGtfs([...FILLER.stations, ...stations], [...FILLER.rows, ...rows]) as {
    stations: Station[];
    changes: unknown;
  };

const find = (stations: Station[], id: number) =>
  stations.find((candidate) => candidate.id === id);

describe("splitCsvLine", () => {
  it("splits on commas outside quotes", () => {
    expect(
      splitCsvLine(
        '1,1,"Jackson & Austin Terminal","Jackson & Austin Terminal, Northeastbound, Bus Terminal",41.87632969,-87.77411061,0,,1',
      ),
    ).toEqual([
      "1",
      "1",
      "Jackson & Austin Terminal",
      "Jackson & Austin Terminal, Northeastbound, Bus Terminal",
      "41.87632969",
      "-87.77411061",
      "0",
      "",
      "1",
    ]);
  });

  it("keeps trailing empty fields", () => {
    expect(splitCsvLine("a,,")).toEqual(["a", "", ""]);
  });

  it("unescapes doubled quotes inside a quoted field", () => {
    expect(splitCsvLine('"say ""hi""",x')).toEqual(['say "hi"', "x"]);
  });
});

describe("parseCsv", () => {
  it("reads CRLF rows into objects keyed by the header", () => {
    const text = [
      "stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,location_type,parent_station,wheelchair_boarding",
      '1,1,"Jackson & Austin Terminal","Jackson & Austin Terminal, Northeastbound, Bus Terminal",41.87632969,-87.77411061,0,,1',
      '30092,,"Racine",,41.87592,-87.659458,0,40470,1',
      "",
    ].join("\r\n");

    expect(parseCsv(text)).toEqual([
      {
        stop_id: "1",
        stop_code: "1",
        stop_name: "Jackson & Austin Terminal",
        stop_desc: "Jackson & Austin Terminal, Northeastbound, Bus Terminal",
        stop_lat: "41.87632969",
        stop_lon: "-87.77411061",
        location_type: "0",
        parent_station: "",
        wheelchair_boarding: "1",
      },
      {
        stop_id: "30092",
        stop_code: "",
        stop_name: "Racine",
        stop_desc: "",
        stop_lat: "41.87592",
        stop_lon: "-87.659458",
        location_type: "0",
        parent_station: "40470",
        wheelchair_boarding: "1",
      },
    ]);
  });

  it("reads an empty file as no rows", () => {
    expect(parseCsv("")).toEqual([]);
  });
});

describe("applyGtfs", () => {
  it("leaves stations GTFS agrees with untouched", () => {
    const racine = station(40470, "Racine (Blue Line)", [
      { id: 30092, accessible: true },
      { id: 30093, accessible: true },
    ]);

    const { stations } = apply(
      [racine],
      [
        gtfsStation(40470),
        gtfsPlatform(30092, 40470, "1"),
        gtfsPlatform(30093, 40470, "1"),
      ],
    );

    expect(stations).toEqual([...FILLER.stations, racine]);
  });

  it("drops a platform GTFS doesn't list", () => {
    const sheridan = station(40080, "Sheridan (Red Line)", [
      { id: 30016, accessible: false },
      { id: 30017, accessible: false },
      { id: 30293, accessible: false, lines: [] },
      { id: 30294, accessible: false, lines: [] },
    ]);

    const { stations } = apply(
      [sheridan],
      [
        gtfsStation(40080),
        gtfsPlatform(30016, 40080, "2"),
        gtfsPlatform(30017, 40080, "2"),
      ],
    );

    expect(find(stations, 40080)?.stops.map((stop) => stop.id)).toEqual([
      30016, 30017,
    ]);
  });

  it("recomputes a station's lines after dropping a platform", () => {
    const mixed = station(40900, "Howard (Red, Purple & Yellow lines)", [
      { id: 30173, accessible: true, lines: ["red"] },
      { id: 30174, accessible: true, lines: ["purple", "yellow"] },
    ]);

    const { stations } = apply(
      [mixed],
      [gtfsStation(40900), gtfsPlatform(30173, 40900, "1")],
    );

    expect(find(stations, 40900)?.lines).toEqual(["red"]);
  });

  it("drops a station whose platforms are all missing", () => {
    const stateLake = station(40260, "State/Lake", [
      { id: 30050, accessible: false },
      { id: 30051, accessible: false },
    ]);

    const { stations } = apply([stateLake], []);

    expect(find(stations, 40260)).toBeUndefined();
    expect(stations).toEqual(FILLER.stations);
  });

  it("takes a platform's accessibility from GTFS in both directions", () => {
    const racine = station(40470, "Racine (Blue Line)", [
      { id: 30092, accessible: false },
    ]);
    const elsewhere = station(40999, "Elsewhere", [
      { id: 30999, accessible: true },
    ]);

    const { stations } = apply(
      [racine, elsewhere],
      [
        gtfsStation(40470),
        gtfsPlatform(30092, 40470, "1"),
        gtfsStation(40999),
        gtfsPlatform(30999, 40999, "2"),
      ],
    );

    expect(find(stations, 40470)?.stops[0].accessible).toBe(true);
    expect(find(stations, 40999)?.stops[0].accessible).toBe(false);
  });

  it("keeps the portal's accessibility when GTFS doesn't know", () => {
    const unknown = station(40998, "Unknown", [
      { id: 30997, accessible: false },
      { id: 30998, accessible: true },
    ]);

    const { stations } = apply(
      [unknown],
      [
        gtfsStation(40998),
        gtfsPlatform(30997, 40998, "0"),
        gtfsPlatform(30998, 40998, ""),
      ],
    );

    expect(find(stations, 40998)?.stops.map((stop) => stop.accessible)).toEqual(
      [false, true],
    );
  });

  it("rolls a station's accessibility up from its platforms", () => {
    const oneFlipped = station(40001, "One flipped", [
      { id: 30001, accessible: false },
      { id: 30002, accessible: false },
    ]);
    const bothFlipped = station(40003, "Both flipped", [
      { id: 30003, accessible: false },
      { id: 30004, accessible: false },
    ]);
    const lostOne = station(40005, "Lost one", [
      { id: 30005, accessible: true },
      { id: 30006, accessible: true },
    ]);

    const { stations } = apply(
      [oneFlipped, bothFlipped, lostOne],
      [
        gtfsStation(40001),
        gtfsPlatform(30001, 40001, "1"),
        gtfsPlatform(30002, 40001, "2"),
        gtfsStation(40003),
        gtfsPlatform(30003, 40003, "1"),
        gtfsPlatform(30004, 40003, "1"),
        gtfsStation(40005),
        gtfsPlatform(30005, 40005, "1"),
        gtfsPlatform(30006, 40005, "2"),
      ],
    );

    expect(find(stations, 40001)?.accessible).toBe(false);
    expect(find(stations, 40003)?.accessible).toBe(true);
    expect(find(stations, 40005)?.accessible).toBe(false);
  });

  it("refuses a feed with fewer than 100 rail stations", () => {
    const { stations, rows } = filler(99);

    expect(() => applyGtfs(stations, rows)).toThrow(
      "GTFS stops.txt lists 99 rail stations; expected at least 100. Not updating station data.",
    );
  });
});

describe("buildSummary", () => {
  const LAST_MODIFIED = "Mon, 14 Sep 2026 21:50:47 GMT";

  it("names each dropped item and changed flag", () => {
    const sheridan = station(40080, "Sheridan (Red Line)", [
      { id: 30016, name: "Sheridan (Howard-bound)", accessible: false },
      { id: 30293, name: "Sheridan (Loop-bound)", accessible: false },
    ]);
    const stateLake = station(40260, "State/Lake (Loop)", [
      { id: 30050, name: "State/Lake (Inner Loop)", accessible: false },
    ]);
    const racine = station(40470, "Racine (Blue Line)", [
      { id: 30092, name: "Racine (O'Hare-bound)", accessible: false },
    ]);
    const elsewhere = station(40999, "Elsewhere (Pink Line)", [
      { id: 30998, name: "Elsewhere (Loop-bound)", accessible: true },
      { id: 30999, name: "Elsewhere (54th-bound)", accessible: true },
    ]);

    const { changes } = apply(
      [sheridan, stateLake, racine, elsewhere],
      [
        gtfsStation(40080),
        gtfsPlatform(30016, 40080, "2"),
        gtfsStation(40470),
        gtfsPlatform(30092, 40470, "1"),
        gtfsStation(40999),
        gtfsPlatform(30998, 40999, "1"),
        gtfsPlatform(30999, 40999, "2"),
        gtfsPlatform(30500, 40999, "1", "Elsewhere-Pink"),
        gtfsStation(41700, "New Station"),
      ],
    );

    expect(buildSummary(changes, LAST_MODIFIED)).toBe(
      [
        "Station data comes from the Chicago Data Portal's \"List of 'L' Stops\", corrected against the CTA's GTFS feed (Last-Modified Mon, 14 Sep 2026 21:50:47 GMT).",
        "",
        "### Dropped because GTFS doesn't list them",
        "",
        "- Platform 30293, Sheridan (Loop-bound)",
        "- Station 40260, State/Lake (Loop)",
        "- Platform 30050, State/Lake (Inner Loop)",
        "",
        "### Accessibility changed to match GTFS",
        "",
        "- Station 40470, Racine (Blue Line): now accessible",
        "- Platform 30092, Racine (O'Hare-bound): now accessible",
        "- Station 40999, Elsewhere (Pink Line): no longer accessible",
        "- Platform 30999, Elsewhere (54th-bound): no longer accessible",
        "",
        "### In GTFS but not the portal, so not added",
        "",
        "- Station 41700, New Station",
        "- Platform 30500, Elsewhere-Pink",
        "",
      ].join("\n"),
    );
  });

  it("says when the rules changed nothing", () => {
    const { changes } = apply([], []);

    expect(buildSummary(changes, LAST_MODIFIED)).toBe(
      [
        "Station data comes from the Chicago Data Portal's \"List of 'L' Stops\", corrected against the CTA's GTFS feed (Last-Modified Mon, 14 Sep 2026 21:50:47 GMT).",
        "",
        "### Dropped because GTFS doesn't list them",
        "",
        "None",
        "",
        "### Accessibility changed to match GTFS",
        "",
        "None",
        "",
        "### In GTFS but not the portal, so not added",
        "",
        "None",
        "",
      ].join("\n"),
    );
  });

  it("ignores bus stops and street entrances", () => {
    const { changes } = apply(
      [],
      [
        {
          stop_id: "14001",
          stop_name: "95th Red Line Station",
          location_type: "0",
          parent_station: "40450",
          wheelchair_boarding: "1",
        },
        {
          stop_id: "60000",
          stop_name: "Clark/Division (NW corner)",
          location_type: "2",
          parent_station: "40630",
          wheelchair_boarding: "1",
        },
      ],
    );

    expect(buildSummary(changes, LAST_MODIFIED)).toContain(
      "### In GTFS but not the portal, so not added\n\nNone\n",
    );
  });

  it("notes a missing Last-Modified header", () => {
    const { changes } = apply([], []);

    expect(buildSummary(changes, null)).toContain("(no Last-Modified header)");
  });
});
