/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

export const TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX = 'ee-ticket-price-calculator';

/**
 * @function
 * @param {Object} formData
 * @param {Object} ticket
 * @return {Object} form data
 */
const buildTicketDataMap = ( formData, ticket ) => {
	let prefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
	prefix += '-ticket-' + ticket.id;
	formData[ `${ prefix }-type` ] = __( 'Base Price', 'event_espresso' );
	formData[ `${ prefix }-name` ] = ticket.name || '';
	formData[ `${ prefix }-desc` ] = ticket.description || '';
	formData[ `${ prefix }-price` ] = ticket.price &&
		ticket.price.amount ? ticket.price.amount.toNumber() : null;
	formData[ `${ prefix }-taxable` ] = ticket.taxable;
	return formData;
};

/**
 * @function
 * @param {Object} formData
 * @param {Object} ticket
 * @param {Array} prices
 * @return {Object} form data
 */
const buildPricesDataMap = ( formData, ticket, prices ) => {
	if ( ! Array.isArray( prices ) || prices.length === 0
	) {
		return {};
	}
	let prefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
	prefix += '-ticket-' + ticket.id + '-price';
	for ( let i = 0; i < prices.length; i++ ) {
		const price = prices[ i ];
		if ( isModelEntityOfModel( price, 'price' ) ) {
			formData[ `${ prefix }-${ price.id }-type` ] = price.prtId || 0;
			formData[ `${ prefix }-${ price.id }-name` ] = price.name || '';
			formData[ `${ prefix }-${ price.id }-desc` ] = price.desc || '';
			formData[ `${ prefix }-${ price.id }-amount` ] = price.amount &&
			price.amount.amount ?
				price.amount.amount.toNumber() :
				null;
		}
	}
	return formData;
};

/**
 * @function
 * @param {Object} ticket
 * @param {Array} prices
 * @return {Object} form data
 */
export const ticketPriceCalculatorFormDataMap = ( ticket, prices ) => {
	if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
		return {};
	}
	let formData = {};
	formData = buildTicketDataMap( formData, ticket );
	formData = buildPricesDataMap( formData, ticket, prices );
	return formData;
};
