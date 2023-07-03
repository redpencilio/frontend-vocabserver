import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ShaclNodeShape extends Model {
  @attr uri;

  @attr targetClass;
  @hasMany('shacl-property-shape', { inverse: 'nodeShape', async: true })
  propertyShapes;
  @belongsTo('vocabulary', { inverse: 'mappingShape', async: true })
  vocabulary;
}
