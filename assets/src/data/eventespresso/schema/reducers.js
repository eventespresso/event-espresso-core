/**
 * Internal dependencies
 */
import { DEFAULT_SCHEMA_STATE } from '../../model';

export default function( state = DEFAULT_SCHEMA_STATE, action ) {
	const { type, modelName, schema } = action;
	switch( type ) {
		case 'RECEIVE_SCHEMA_RECORD':
			// todo we need to convert the schema to its generated entity constructor.
			// and that's what gets added to state.
			return {
				...state,
				[ modelName ]: schema,
			};
	}
	return state;
};