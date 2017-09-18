const keyName = "slowzone:recent";

class MostRecentlyUsed {
  constructor(list = []) {
    this.list = list;
  }

  push(key, item) {
    const newItem = {...item, key};
    const filteredList = this.list.filter(entry => entry.key !== key);

    filteredList.push(newItem);
    this.list = filteredList;
    return this.list;
  }

  get() {
    return this.list
      .slice()
      .reverse()
      .map(item => {
        const {key, ...values} = item;
        return values;
      });
  }

  toJSON() {
    return this.list;
  }
}

export const getRecentStations = () => {
  const data = window.localStorage.getItem(keyName) || "[]";
  return new MostRecentlyUsed(JSON.parse(data)).get();
};

export const pushStation = (stationId, station) => {
  const data = window.localStorage.getItem(keyName) || "[]";
  const list = new MostRecentlyUsed(JSON.parse(data));

  list.push(stationId, station);

  window.localStorage.setItem(keyName, JSON.stringify(list));
};
