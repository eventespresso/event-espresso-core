/**
 * External dependencies
 */
import { select } from '@wordpress/data';

/**
 * Invokes the selector for whether a given selectorName in a given registered
 * reducer store is in the midst of resolving.
 * @param {string} reducerKey
 * @param {string} selectorName
 * @param {*[]} args
 * @return {boolean}  True means the selector is resolving. False means it
 * either hasn't started yet or is complete.
 */
export const isResolving = ( reducerKey, selectorName, ...args ) => {
	return select( 'core/data' ).isResolving( reducerKey, selectorName, args );
};

/**
 * Invokes the selector for whether a given selectorName in a given registered
 * reducer store has finished resolving.
 *
 * @param {string} reducerKey
 * @param {string} selectorName
 * @param {*[]} args
 * @return {boolean} True means the selector has finished resolving.  False
 * means it either hasn't started yet or is in the midst of resolving.
 */
export const hasFinishedResolving = ( reducerKey, selectorName, ...args ) => {
	return select( 'core/data' )
		.hasFinishedResolution( reducerKey, selectorName, args );
};
