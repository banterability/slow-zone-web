/* @flow */

class MostRecentlyUsed {
  data: Array<mixed>;
  storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  _fetch = () => {
    this.data = JSON.parse(
      window.localStorage.getItem(this.storageKey) || "[]"
    );
  };

  _persist = () => {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  };

  get() {
    this._fetch();

    return this.data
      .slice()
      .reverse()
      .map(item => {
        const {key, ...values} = item;
        return values;
      });
  }

  push(key: string, item: any) {
    this._fetch();

    const newItem = {...item, key};
    const filteredList = this.data.filter(entry => entry.key !== key);

    filteredList.push(newItem);
    this.data = filteredList;

    this._persist();

    return this.data;
  }
}

export default MostRecentlyUsed;
