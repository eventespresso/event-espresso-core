/**
 * External imports
 */
import { find } from 'lodash';
import warning from 'warning';
import { select, dispatch } from '@wordpress/data';
import { __ } from '@eventespresso/i18n';
import { priceTypeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import { updatePrice } from '../action-handlers/update-price';
import {
	calculateTicketBasePrice,
} from '../price-calculator/ticket-price-calculator';

const { BASE_PRICE_TYPES } = priceTypeModel;
const { getRelatedEntities } = select( 'eventespresso/core' );
const { createEntity, persistEntityRecord } = dispatch( 'eventespresso/core' );
const { getEntities } = select( 'eventespresso/lists' );

/**
 * @function
 * @param {Object} ticket 	model object defining the ticket
 * @return {Promise} updated dateEntity upon resolution
 */
export const updateTicket = async ( ticket ) => {
	return new Promise( async ( resolve, reject ) => {
		if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
			reject( Error(
				__( 'Unable to process the Ticket Entity form because an' +
					' invalid Ticket Entity was supplied. ', 'event_espresso' )
			) );
		}
		ticket = await recalculateTicketBasePrice( ticket );
		resolve( persistEntityRecord( 'ticket', ticket ) );
	} );
};

const getPriceType = async ( priceTypeId ) => {
	const priceTypes = await getEntities( 'price_type' );
	const priceType = find( priceTypes, [ 'PRT_ID', priceTypeId ] );
	warning(
		isModelEntityOfModel( priceType, 'price_type' ),
		__(
			'Unable to process the Edit Ticket form because a valid Price' +
			' Type could not be retrieved for the supplied Ticket. ',
			'event_espresso'
		)
	);
	return priceType;
};

const recalculateTicketBasePrice = async ( ticket ) => {
	const prices = await getRelatedEntities( ticket, 'prices' );
	const priceModifiers = [];
	for ( const price of prices ) {
		priceModifiers.push( {
			type: await getPriceType( price.prtId ),
			amount: price.amount.toNumber(),
		} );
	}
	const newBasePrice = calculateTicketBasePrice(
		ticket.price.amount.toNumber(),
		priceModifiers
	);
	let ticketBasePrice = find(
		prices,
		async ( price ) => {
			warning(
				isModelEntityOfModel( price, 'price' ),
				__(
					'Unable to process the Edit Ticket form because a valid' +
					' Price could not be retrieved for the supplied Ticket. ',
					'event_espresso'
				)
			);
			const priceType = await getPriceType( price.prtId );
			return priceType.pbtId === BASE_PRICE_TYPES.BASE_PRICE;
		}
	);
	if ( ! isModelEntityOfModel( ticketBasePrice, 'price' ) ) {
		ticketBasePrice = await createEntity( 'price', { PRT_ID: 1 } );
	}
	ticketBasePrice.amount = new Money( newBasePrice, SiteCurrency );
	await updatePrice( ticketBasePrice, ticket );
	return ticket;
};

