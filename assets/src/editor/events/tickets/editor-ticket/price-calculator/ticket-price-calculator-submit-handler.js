/**
 * External imports
 */
import { __, sprintf } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { Money, SiteCurrency } from '@eventespresso/value-objects';
import { dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { updatePrice } from '../action-handlers/update-price';
import { updateTicket } from '../action-handlers/update-ticket';
import {
	shortenCuid,
	TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX,
} from './';

/**
 * updates Ticket and Price Entity properties given the supplied form data
 *
 * @function
 * @param {Object} ticket
 * @param {Array} prices
 * @param {Object} formData
 * @return {Promise} updated ticketEntity upon resolution
 */
export const ticketPriceCalculatorSubmitHandler = async (
	ticket,
	prices,
	formData
) => {
	const errors = [];
	if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
		errors.push(
			sprintf(
				__(
					'invalid ticket entity supplied to' +
					' ticketPriceCalculatorSubmitHandler(): %s',
					'event_espresso'
				),
				ticket
			)
		);
		return errors;
	}
	const ticketId = ticket.id;
	ticket.price = new Money(
		formData.ticketTotal || 0,
		SiteCurrency
	);
	if ( Array.isArray( prices ) ) {
		let prefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
		prefix += '-ticket-' + ticketId + '-price';
		prices.forEach( async ( price ) => {
			if ( isModelEntityOfModel( price, 'price' ) ) {
				const priceId = shortenCuid( price.id );
				const pricePrefix = `${ prefix }-${ priceId }`;
				if ( formData[ `${ pricePrefix }-id` ] === priceId ) {
					price.prtId = parseInt( formData[ `${ pricePrefix }-type` ] );
					price.name = formData[ `${ pricePrefix }-name` ] || '';
					price.desc = formData[ `${ pricePrefix }-desc` ] || '';
					price.amount = new Money(
						formData[ `${ pricePrefix }-amount` ] || 0,
						SiteCurrency
					);
					price = await updatePrice( price, ticket );
					if ( ! isModelEntityOfModel( price, 'price' ) ) {
						errors.push(
							sprintf(
								__(
									'update for price %s failed',
									'event_espresso'
								),
								priceId
							)
						);
					}
				}
			}
		} );
	}
	ticket = await updateTicket( ticket );
	if ( isModelEntityOfModel( ticket, 'ticket' ) ) {
		const {
			persistRelationsForEntityIdAndRelation,
		} = dispatch( 'eventespresso/core' );
		await persistRelationsForEntityIdAndRelation(
			'ticket',
			ticketId,
			'prices'
		);
		return ticket;
	}
	errors.push(
		sprintf(
			__( 'update for ticket %s failed', 'event_espresso' ),
			ticketId
		)
	);
	return errors;
};
