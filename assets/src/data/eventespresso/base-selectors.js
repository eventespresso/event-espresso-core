/**
 * External dependencies
 */
import { select } from '@wordpress/data';

export const isResolving = ( reducerKey, selectorName, ...args ) => {
	return select( 'core/data' ).isResolving( reducerKey, selectorName, args );
};
