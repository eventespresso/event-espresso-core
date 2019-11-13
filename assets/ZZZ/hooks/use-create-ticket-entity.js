/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import {
	Duration,
	ServerDateTime,
	Money,
	SiteCurrency,
} from '@eventespresso/value-objects';

const userID = typeof window.userSettings === 'object' &&
	window.userSettings.uid ?
	parseInt( window.userSettings.uid, 10 ) :
	null;

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
			const nowJs = new Date();
			nowJs.setHours(
				nowJs.getHours(),
				Math.ceil( nowJs.getMinutes() / 15 ) * 15,
				0,
				0
			);
			const now = ServerDateTime.fromJSDate( nowJs );
			const newTicket = await createEntity(
				'ticket',
				{
					TKT_name: '',
					TKT_description: '',
					TKT_qty: -1,
					TKT_sold: 0,
					TKT_reserved: 0,
					TKT_uses: -1,
					TKT_required: false,
					TKT_min: 0,
					TKT_max: -1,
					TKT_price: new Money( 0, SiteCurrency ),
					TKT_startDate: now,
					TKT_endDate: now.plus(
						Duration.fromObject( { days: 30 } )
					),
					TKT_taxable: false,
					TKT_order: 0,
					TKT_isDefault: false,
					TKT_reverse_calculate: false,
					TKT_wp_user: userID,
					TKT_parent: 0,
					TKT_deleted: false,
				}
			);
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
