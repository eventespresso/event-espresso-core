/**
 * External imports
 */
import { isArray } from 'lodash';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import { updatePrice } from '../action-handlers/update-price';
import { updateTicket } from '../action-handlers/update-ticket';
import {
	shortenCuid,
	TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX,
} from './ticket-price-calculator-form-data-map';

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
	console.log( '' );
	console.log( 'ticketPriceCalculatorSubmitHandler()' );
	console.log( ' > ticketEntity: ', ticket );
	console.log( ' > prices: ', prices );
	console.log( ' > formData: ', formData );
	if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
		return null;
	}
	ticket.price = new Money(
		formData.ticketTotal || 0,
		SiteCurrency
	);
	if ( isArray( prices ) ) {
        let prefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
        prefix += '-ticket-' + ticket.id + '-price';
        for ( let i = 0; i < prices.length; i++ ) {
            let price = prices[ i ];
            if ( isModelEntityOfModel( price, 'price' ) ) {
                const priceId = shortenCuid( price.id );
                const pricePrefix = `${ prefix }-${ priceId }`;
                if ( price.id === formData[ `${ pricePrefix }-id` ] ) {
                    price.prtId = parseInt( formData[ `${ pricePrefix }-type` ] );
                    price.name = formData[ `${ pricePrefix }-name` ] || '';
                    price.desc = formData[ `${ pricePrefix }-desc` ] || '';
                    price.amount = new Money(
                        formData[ `${ pricePrefix }-amount` ] || 0,
                        SiteCurrency
                    );
                    price = await updatePrice( price, ticket );
                    console.log( 'price', price );
                }
            }
        }
	}
	ticket = await updateTicket( ticket );
	console.log( 'ticket', ticket );
	return true;
};
