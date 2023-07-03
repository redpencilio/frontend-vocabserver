import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class Dataset extends Model {
  @attr uri;

  @attr title;
  @attr downloadPage;
  @attr modified;
  @attr format;
  @attr('boolean') dereferenceMembers;
  @attr('number') maxRequests;

  @hasMany('file', { inverse: null, async: true }) dataDumps;
  @belongsTo('dataset-type', { inverse: 'datasets', async: true }) type;

  @attr property;
  @attr class;
  @attr entities;

  @hasMany('dataset', { inverse: null, async: true }) classes;
  @hasMany('dataset', { inverse: null, async: true }) properties;

  @belongsTo('vocabulary', { inverse: 'dataset', async: true }) vocabulary;
}
