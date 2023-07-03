import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class VocabularyModel extends Model {
  @attr('string') name;

  @attr('string') uri;

  @hasMany('dataset', { inverse: 'vocabulary', async: true }) sourceDatasets;
  @belongsTo('shacl-node-shape', { inverse: 'vocabulary', async: true })
  mappingShape;
}
