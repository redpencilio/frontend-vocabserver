import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Store from '@ember-data/store';

export default class VocabulariesRoute extends Route {
  @service declare store: Store;
  model() {
    return this.store.findAll('vocabulary');
  }
}