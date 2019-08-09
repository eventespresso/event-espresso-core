/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useCreateRelationsForTicketToPrices
	from './use-create-relations-for-ticket-to-prices';

const useCreateTicketEntity = ( cacheNewTicket, basePriceType ) => {
	const { createEntity } = useDispatch( 'eventespresso/core' );
	const updateTicketPriceRelations = useCreateRelationsForTicketToPrices();
	return useCallback(
		async () => {
			const newTicket = await createEntity( 'ticket', {} );
			const newBasePrice = await createEntity(
				'price',
				{ PRT_ID: basePriceType.id }
			);
			await updateTicketPriceRelations( newTicket, [ newBasePrice ] );
			cacheNewTicket( newTicket );
		},
		[ createEntity, updateTicketPriceRelations ]
	);
};

export default useCreateTicketEntity;
