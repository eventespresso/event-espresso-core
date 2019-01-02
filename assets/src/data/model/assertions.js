/**
 * External imports
 */
import { Exception } from '@eventespresso/eejs';
import { sprintf, __ } from '@eventespresso/i18n';
import { isArray, isEmpty, isMap } from 'lodash';

/**
 * Asserts whether the given key exists in the provided entity object.
 * This is used when calling code wants an exception to be thrown.
 *
 * @param { string } key
 * @param { Object } entity
 * @param { string } message
 * @throws { Exception }  Throws an exception if the provided entity does not
 *                          have the given key.
 */
export const assertEntityHasKey = ( key, entity, message = '' ) => {
	if ( message === '' ) {
		message = sprintf(
			__(
				'The provided entity (%s) does not have the given property (%s)',
				'event_espresso',
			),
			entity,
			key,
		);
	}
	if ( ! entity.hasOwnProperty( key ) ) {
		throw new Exception( message );
	}
};

/**
 * Asserts whether the given path in the provided immutable object exists.
 * This is used when calling code wants an exception to be thrown if the given
 * search path array does not exist in the immutable object.
 *
 * If the immutable object is setup like this:
 *
 * immutable = Immutable.Map().set( 'event', Immutable.Map().set( 10, Event ) );
 *
 * Then a valid searchable path could be `[ 'event', 10 ]`.  An invalid path
 * would be `[ 'datetime', 10 ]`
 *
 * @param {Array} path  Searchable path for the immutable ojbect to verify.
 * @param {Immutable.Map|Immutable.Set} immutable  An immutable object (Map, Set, List etc)
 * @param {string} message A custom message to use.
 * @throws Exception
 */
export const assertImmutableObjectHasPath = (
	path,
	immutable,
	message = ''
) => {
	if ( message === '' ) {
		message = sprintf(
			__(
				'The provided immutable object (%s) does not have the given path (%s)',
				'event_espresso',
			),
			immutable,
			path,
		);
	}
	if ( ! immutable.hasIn( path ) ) {
		throw new Exception( message );
	}
}

/**
 * Asserts whether the given value is an array.
 *
 * @param {*} items
 * @param { string }  message
 * @throws { Exception } Throws an exception if the provided value is not an
 *                          array.
 */
export const assertIsArray = ( items, message = '' ) => {
	if ( message === '' ) {
		message = __( 'The provided value is not an array.', 'event_espresso' );
	}
	if ( ! isArray( items ) ) {
		throw new Exception( message );
	}
};

/**
 * Validates whether the given value is empty or not.
 *
 * Call this validator when you want to make sure the value is NOT empty.
 *
 * @param {*} items
 * @param { string } message
 * @throws { Exception } Throws an exception if the provided value is empty.
 */
export const assertIsNotEmpty = ( items, message = '' ) => {
	if ( message === '' ) {
		message = __(
			'The provided items must not be empty',
			'event_espresso',
		);
	}
	if ( isEmpty( items ) ) {
		throw new Exception( message );
	}
};

/**
 * Asserts whether the given value is a Map object.
 *
 * @param {*} item
 * @param {string} message
 * @throws { Exception }
 */
export const assertIsMap = ( item, message = '' ) => {
	if ( message === '' ) {
		message = __(
			'The provided item must be a Map object',
			'event_espresso'
		);
	}
	if ( ! isMap( item ) ) {
		throw new Exception( message );
	}
};
