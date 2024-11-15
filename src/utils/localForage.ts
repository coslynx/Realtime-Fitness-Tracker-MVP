// src/utils/localForage.ts

import localForage from 'localForage';

class LocalCache {
  setItem(key: string, value: any): Promise<void> {
    return localForage.setItem(key, value);
  }

  getItem(key: string): Promise<any | null> {
    return localForage.getItem(key);
  }

  removeItem(key: string): Promise<void> {
    return localForage.removeItem(key);
  }

  clear(): Promise<void> {
    return localForage.clear();
  }
}

export const LocalCache = new LocalCache();