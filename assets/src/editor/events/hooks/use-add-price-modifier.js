/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * useAddPriceModifier
 * returns an object containing the following two functions:
 *  - addPriceModifier
 *  - trashPriceModifier
 *
 * @return {Object} functions
 */
const useAddPriceModifier = () => {
	const {
		createEntity,
		createRelation,
	} = useDispatch( 'eventespresso/core' );
	return useCallback(
		async ( ticketEntity, properties ) => {
			const priceModifier = await createEntity(
				'price',
				properties
			);
			if ( isModelEntityOfModel( priceModifier, 'price' ) ) {
				createRelation(
					'ticket',
					ticketEntity.id,
					'price',
					priceModifier
				);
			}
		},
		[]
	);
};

export default useAddPriceModifier;
