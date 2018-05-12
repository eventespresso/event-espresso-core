/**
 * External imports
 */
import { Exception } from '@eventespresso/eejs';
import { sprintf, __ } from '@eventespresso/i18n';

/**
 * Validates whether the given key exists in the provied entity object.
 * This is used when calling code wants an exception to be thrown.
 *
 * @param { string } key
 * @param { Object } entity
 * @throws { Exception }
 */
export const validateEntityHasKey = ( key, entity ) => {
	if ( ! entity.hasOwnProperty( key ) ) {
		throw new Exception(
			sprintf(
				__( 'The provided entity (%s) does not have the given property (%s)',
					'event_espresso',
				),
				entity,
				key,
			),
		);
	}
};
