/**
 * Internal dependencies
 */
import { receiveSchemaForModel, fetchFromAPI } from './actions';
import { getEndpoint } from '../../model';

export function* getSchema( state, modelName ) {
	const path = getEndpoint( modelName );
	const schema = yield fetchFromAPI( path );
	return receiveSchemaForModel( modelName, schema );
};
