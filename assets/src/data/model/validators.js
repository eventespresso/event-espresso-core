/**
 * External imports
 */
import { exception as GeneralException } from '@eventespresso/eejs';
import { sprintf, __ } from '@eventespresso/i18n';

export const validateEntityHasKey = ( key, entity ) => {
	if ( ! entity.hasOwnProperty( key ) ) {
		throw new GeneralException(
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
