import { tracked } from '@glimmer/tracking';
// Class to ensure all values of the dictionary are tracked, see https://guides.emberjs.com/release/in-depth-topics/autotracking-in-depth/#toc_plain-old-javascript-objects-pojos
export default class SimpleCache {
  @tracked _cache = {};

  set(key, value) {
    this._cache[key] = value;

    // trigger an update
    this._cache = this._cache;
  }

  get(key) {
    return this._cache[key];
  }
}
