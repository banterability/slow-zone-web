const {gql} = require("apollo-server");

const typeDefs = gql`
  enum Line {
    BLUE
    BROWN
    GREEN
    ORANGE
    PINK
    PURPLE
    RED
    YELLOW
  }

  enum Direction {
    N
    S
    E
    W
  }

  type Distance {
    feet: Float
    miles: Float
  }

  type Location {
    latitude: Float
    longitude: Float
    heading: Float
  }

  type Stop {
    id: Int
    direction: Direction
    name: String
    accessible: Boolean
    lines: [Line]
  }

  type Station {
    name: String
    description: String
    distance: Distance
    id: Int
    location: Location
    stops: [Stop]
    lines: [Line]
    accessible: Boolean
    url: String
  }

  type Query {
    stations: [Station]
    station(id: Int!): Station
  }
`;

module.exports = typeDefs;
