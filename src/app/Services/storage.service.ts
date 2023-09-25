import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  async setToken(token: string) {
    await this._storage?.set('token', token);
  }

  async getToken() {
    return await this._storage?.get('token');
  }

  async deleteToken() {
    await this._storage?.remove('token');
  }
  
}
