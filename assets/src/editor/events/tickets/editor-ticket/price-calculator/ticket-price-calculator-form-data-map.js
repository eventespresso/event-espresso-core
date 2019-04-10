/**
 * External imports
 */
import { isArray, isEmpty, uniq } from 'lodash';
import { isModelEntityOfModel } from '@eventespresso/validators';

export const TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX = 'ee-ticket-price-calculator';

/**
 * @function
 * @param {Object} formData
 * @param {Object} ticket
 * @return {Object} form data
 */
const buildTicketDataMap = ( formData, ticket ) => {
	formData.ticketID = ticket.id;
	formData.ticketIsTaxable = ticket.taxable;
	formData.ticketTotal = ticket.price && ticket.price.amount ?
		ticket.price.formatter.formatNumber( ticket.price.amount.toNumber() ) :
		null;
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
	if ( ! isArray( prices ) || prices.length === 0 ) {
		return {};
	}
	let prefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
	prefix += '-ticket-' + ticket.id + '-price';
	const priceIDs = [];
	const priceTypes = [];
	prices.forEach( ( price ) => {
		if ( isModelEntityOfModel( price, 'price' ) ) {
			const priceId = shortenCuid( price.id );
			priceIDs.push( priceId );
			priceTypes.push( price.prtId );
			const pricePrefix = `${ prefix }-${ priceId }`;
			formData[ `${ pricePrefix }-id` ] = priceId;
			formData[ `${ pricePrefix }-type` ] = parseInt( price.prtId );
			formData[ `${ pricePrefix }-name` ] = price.name || '';
			formData[ `${ pricePrefix }-desc` ] = price.desc || '';
			formData[ `${ pricePrefix }-amount` ] = price.amount &&
			price.amount.amount ?
				price.amount.formatter.formatNumber(
					price.amount.amount.toNumber()
				) :
				0;
		}
	} );
	formData.priceIDs = isArray( priceIDs ) && ! isEmpty( priceIDs ) ?
		uniq( priceIDs ).join() :
		'';
	formData.priceTypes = isArray( priceTypes ) && ! isEmpty( priceTypes ) ?
		uniq( priceTypes ).join() :
		'';
	return formData;
};

/**
 * @function
 * @param {string} cuid
 * @return {string} cuid snippet
 */
export const shortenCuid = ( cuid ) => {
	if ( cuid.hasOwnProperty( 'length' ) && cuid.length > 18 ) {
		// use a smaller more unique portion of the CUID
		return cuid.substring( 12, 18 );
	}
	return cuid;
};

/**
 * @function
 * @param {Object} ticket
 * @param {Array} prices
 * @param {boolean} reverseCalculate
 * @return {Object} form data
 */
export const ticketPriceCalculatorFormDataMap = (
	ticket,
	prices,
	reverseCalculate
) => {
	if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
		return {};
	}
	let formData = {};
	formData = buildTicketDataMap( formData, ticket );
	formData = buildPricesDataMap( formData, ticket, prices );
	formData.reverseCalculate = !! reverseCalculate;
	return formData;
};
