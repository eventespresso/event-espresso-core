/**
 * External imports
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import useCloneEntities from './use-clone-entities';
import useCreateRelationsForTicketToEventDates
	from './use-create-relations-for-ticket-to-event-dates';
import useCreateRelationsForTicketToPrices
	from './use-create-relations-for-ticket-to-prices';
import { MODELS } from '../data/model/constants';
const { PRICE, PRICES, TICKET } = MODELS;

const falseFunc = () => false;

const useCopyTicket = ( ticketEntity, dateEntities ) => {
	const { createEntity } = useDispatch( 'eventespresso/core' );
	const relatedPrices = useSelect( ( select ) => {
		const { getRelatedEntities } = select( 'eventespresso/core' );
		return getRelatedEntities( ticketEntity, PRICES );
	}, [ ticketEntity ] );
	const newPrices = useCloneEntities( relatedPrices, PRICE );
	const updateTicketDateRelations = useCreateRelationsForTicketToEventDates();
	const updateTicketPriceRelations = useCreateRelationsForTicketToPrices();
	return useCallback( async () => {
		if ( ! isModelEntityOfModel( ticketEntity, TICKET ) ) {
			return falseFunc;
		}

		const newTicket = await createEntity(
			TICKET,
			ticketEntity.forClone
		);

		updateTicketDateRelations( newTicket, dateEntities );
		if ( Array.isArray( newPrices ) && newPrices.length ) {
			await updateTicketPriceRelations( newTicket, newPrices );
		}
	} );
};

export default useCopyTicket;
