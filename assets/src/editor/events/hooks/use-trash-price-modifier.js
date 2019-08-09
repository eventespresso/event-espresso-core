/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * useTrashPriceModifier
 * returns an object containing the following two functions:
 *  - addPriceModifier
 *  - trashPriceModifier
 *
 * @return {Object} functions
 */
const useTrashPriceModifier = () => {
	const {
		removeRelationForEntity,
		trashEntityById,
	} = useDispatch( 'eventespresso/core' );
	return useCallback(
		async ( priceModifier, ticketEntity ) => {
			if ( ! isModelEntityOfModel( priceModifier, 'price' ) ) {
				throw new Error(
					__(
						'Unable to perform deletion because an invalid Price' +
						' Entity was supplied by the Ticket Price Calculator.',
						'event_espresso'
					)
				);
			}
			removeRelationForEntity(
				'ticket',
				ticketEntity.id,
				'price',
				priceModifier.id
			);
			trashEntityById( 'price', priceModifier.id );
		},
		[]
	);
};

export default useTrashPriceModifier;
