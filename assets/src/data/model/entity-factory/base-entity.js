import { assertValidSchema } from './assertions';
import {
	createGetter, createInitialGettersAndSetters } from './create';

/**
 * Todo Block
 * - for field properties and setters should we strip `_` and lowercaseize,
 *   camelize? (i.e. `entity.EVT_desc` -> `entity.evtDesc`
 * - for field properties and setters should we strip any field prefix?
 *   (i.e. `entity.EVT_desc` -> `entity.desc`) If so, then this is something
 *   that would have to be provided by the model so its known what the prefix
 *   will be.  We'd also have to make sure the prefix is added back in for
 *   updates to the db.
 */

const privateProperties = {
	dirty: Symbol( 'baseEntityPrivatePropertiesIsDirty' ),
};

class BaseEntity {
	[ privateProperties.dirty ] = false;

	constructor( modelName, entityFieldsAndValues, schema ) {
		assertValidSchema( schema );
		createGetter( this, 'schema', schema.properties );
		createGetter( this, 'modelName', modelName );
		createGetter( this, 'originalFieldsAndValues', entityFieldsAndValues );
		createGetter( this, 'isDirty', this[ privateProperties.dirty ] );
		createInitialGettersAndSetters( this, privateProperties );
	}
}

export const createEntityFactory = ( modelName, schema ) => {
	return ( fieldsAndValues ) =>
		new BaseEntity( modelName, fieldsAndValues, schema );
};
