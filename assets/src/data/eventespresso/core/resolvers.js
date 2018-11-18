/**
 * External imports
 */
import {
	getPrimaryKey,
	applyQueryString,
	createAndKeyEntitiesByPrimaryKeyValue,
} from '@eventespresso/model';
import { isModelEntityFactoryOfModel } from '@eventespresso/validators';

/**
 * Internal Imports
 */
import { fetch } from '../base-controls';
import { getFactoryByModel } from '../base-resolvers';
import { receiveEntityRecords } from './actions';

export function* getEntityById( modelName, entityId ) {
	const primaryKeyForModel = getPrimaryKey( modelName );
	let entity = yield fetch( {
		path: applyQueryString(
			modelName,
			primaryKeyForModel + '=' + entityId
		),
	} );
	entity = {
		[ entityId ]: entity,
	};
	const factory = yield getFactoryByModel( modelName );
	if ( ! isModelEntityFactoryOfModel( factory, modelName ) ) {
		return;
	}
	const fullEntity = createAndKeyEntitiesByPrimaryKeyValue( factory, entity );
	yield receiveEntityRecords( modelName, fullEntity );
}
