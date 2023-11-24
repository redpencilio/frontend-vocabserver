import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import config from 'frontend-vocab-search-admin/config/constants';
import Job from '../../models/job';
import SimpleCache from '../../helpers/SimpleCache';

export default class VocabularyIndexController extends Controller {
  @service store;
  @service router;
  @tracked showAddSource = false;
  @tracked page = 0;
  @tracked size = 20;
  @tracked ldesDereference = false;
  @tracked ldesMaxRequests = 120;
  @tracked show = new SimpleCache();

  @action
  async switchShowAddSource() {
    this.showAddSource = !this.showAddSource;
  }

  @action
  isDownloadAllowed(dataset) {
    return this.show.get(dataset.uri);
  }

  @task
  *monitorDatasetProgress(dataset) {
    this.show.set(dataset.uri, true);
    while (true) {
      let job;
      const jobs = yield this.store.query('vocab-download-job', {
        'filter[sources]': dataset.uri,
        sort: '-created',
        'page[size]': 1,
      });
      if (jobs.length === 1) {
        job = jobs.firstObject;
        this.show.set(
          dataset.uri,
          !job.isRunning &&
            dataset.type.get('uri') === config.DATASET_TYPES.FILE_DUMP
        );
      } else {
        this.show.set(dataset.uri, true);
      }
      yield timeout(1000);
    }
  }

  @action
  async deleteDataset(dataset) {
    await dataset.destroyRecord();
  }

  @task
  *createAndRunDownloadJob(dataset) {
    const record = this.store.createRecord('vocab-download-job', {
      created: new Date(),
      sources: dataset.get('uri'),
    });
    yield record.save();
    this.router.refresh();
  }

  @task
  *addSource(downloadType, downloadUrl, downloadFormat) {
    const vocabularyMeta = this.store.findRecord(
      'vocabulary',
      this.model.vocabulary_id
    );
    yield vocabularyMeta;
    const dataset = this.store.createRecord('dataset', {
      downloadPage: downloadUrl,
      format: downloadFormat.value,
      dereferenceMembers: this.ldesDereference,
      maxRequests: this.ldesMaxRequests,
      vocabulary: vocabularyMeta,
      type: downloadType,
    });
    yield dataset.save();
    if (downloadType?.uri === config.DATASET_TYPES.FILE_DUMP) {
      yield this.createAndRunDownloadJob.perform(dataset);
    }
    yield this.switchShowAddSource();
    this.router.refresh();
  }
}
