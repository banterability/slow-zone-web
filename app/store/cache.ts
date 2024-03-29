type CacheEntry = {
  key: string;
};

class LocalStorageCache {
  data: CacheEntry[];
  storageKey: string;

  constructor(storageKey: string) {
    this.data = [];
    this.storageKey = storageKey;
  }

  _fetch(): void {
    this.data = JSON.parse(
      window.localStorage.getItem(this.storageKey) || "[]",
    );
  }

  _flush(): void {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  get(): Array<any> {
    this._fetch();
    return this.data;
  }

  push(key: number | string, item: any) {
    this._fetch();

    const newItem: CacheEntry = { ...item, key };
    const filteredList = this.data.filter((entry) => entry.key !== key);

    filteredList.push(newItem);
    this.data = filteredList;

    this._flush();

    return this.data;
  }

  delete(key: number | string) {
    this._fetch();

    const filteredList = this.data.filter((entry) => entry.key !== key);
    this.data = filteredList;

    this._flush();
    return;
  }
}

export default LocalStorageCache;
