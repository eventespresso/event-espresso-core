/**
 * External imports.
 */
import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import warning from 'warning';

const DEFAULT_ARRAY = [];

/**
 * A custom react hook for retrieving the related ticket entities for the given
 * date entity from the eventespresso/core store state.
 *
 * @param {BaseEntity} dateEntity  A datetime BaseEntity instance.
 *
 * @return {BaseEntity[]} An array of tickets belonging to the given datetime.
 */
const useEditorDateTicketEntities = ( dateEntity ) => {
	return useSelect( ( select ) => {
		if ( ! isModelEntityOfModel( dateEntity, 'datetime' ) ) {
			warning(
				false,
				'The provided value is not a valid datetime entity.'
			);
			return DEFAULT_ARRAY;
		}
		const { getRelatedEntities } = select( 'eventespresso/core' );
		return getRelatedEntities( dateEntity, 'ticket' );
	}, [ dateEntity ] );
};

export default useEditorDateTicketEntities;
