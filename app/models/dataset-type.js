import Model, { attr, hasMany } from '@ember-data/model';

export default class Dataset extends Model {
  @attr uri;
  @attr prefLabel;

  @hasMany('dataset', { inverse: 'type', async: true }) datasets;
}
