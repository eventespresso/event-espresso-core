/**
 * External imports
 */
import { Exception } from '@eventespresso/eejs';
import { sprintf, __ } from '@eventespresso/i18n';
import { isArray, isEmpty } from 'lodash';

/**
 * Validates whether the given key exists in the provided entity object.
 * This is used when calling code wants an exception to be thrown.
 *
 * @param { string } key
 * @param { Object } entity
 * @param { string } customMessage
 * @throws { Exception }  Throws an exception if the provided entity does not
 * 						  have the given key.
 */
export const validateEntityHasKey = ( key, entity, customMessage = '' ) => {
	const message = customMessage === '' ?
		sprintf(
			__( 'The provided entity (%s) does not have the given property (%s)',
				'event_espresso',
			),
			entity,
			key,
		) :
		customMessage;
	if ( ! entity.hasOwnProperty( key ) ) {
		throw new Exception( message );
	}
};

/**
 * Validates whether the given value is an array.
 *
 * @param {*} items
 * @param { string }  customMessage
 * @throws { Exception } Throws an exception if the provided value is not an
 * 						  array.
 */
export const validateIsArray = ( items, customMessage = '' ) => {
	const message = customMessage === '' ?
		__( 'The provided value is not an array.', 'event_espresso' ) :
		customMessage;
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
 * @param { string } customMessage
 * @throws { Exception } Throws an exception if the provided value is empty.
 */
export const validateIsNotEmpty = ( items, customMessage = '' ) => {
	const message = customMessage === '' ?
		__( 'The provided items must not be empty', 'event_espresso' ) :
		customMessage;
	if ( isEmpty( items ) ) {
		throw new Exception( message );
	}
};
