import Component from '@glimmer/component';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class DatasetMetadataComponent extends Component {
  @service store;

  @tracked classes;
  @tracked properties;

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  @task
  *loadData() {
    const datasets = yield this.store.query('dataset', {
      'filter[:id:]': this.args.dataset.id,
      include: 'classes,properties',
    });
    this.dataset = yield datasets[0];
    this.classes = (yield this.dataset.get('classes'))
      .slice()
      .sort((d) => d.get('entities'))
      .reverse();
    this.properties = (yield this.dataset.get('properties'))
      .slice()
      .sort((d) => d.get('entities'))
      .reverse();
  }
}
