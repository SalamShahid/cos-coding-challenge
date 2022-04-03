import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

//Storage type can be easily changed to any thing like SQlite, indexedDB, capacitor storage etc.
export class StorageService {
  constructor() {}

  set(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const ret = localStorage.getItem(key);
    if (ret && ret != 'undefined') {
      return JSON.parse(ret);
    } else {
      return null;
    }
  }

  // Remove the value
  removeStorageItem(storageKey: string) {
    localStorage.removeItem(storageKey);
  }

  // Clear storage
  clear() {
    localStorage.clear();
  }
}
