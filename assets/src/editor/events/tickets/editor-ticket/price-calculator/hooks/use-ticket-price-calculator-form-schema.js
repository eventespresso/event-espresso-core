/**
 * External imports
 */
import { isArray, isEmpty, uniq } from 'lodash';
import { useMemo } from '@wordpress/element';
import { BaseEntity } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { Money } from '@eventespresso/value-objects';
import { shortenCuid } from '@eventespresso/utils';

/**
 * Internal imports
 */
import { TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX } from '../constants';

/**
 * @function
 * @param {BaseEntity} price
 * @param {number|null} defaultValue
 * @return {number|null} amount
 */
const getPriceAmount = ( price, defaultValue = 0 ) => {
	if ( isModelEntityOfModel( price, 'price' ) ) {
		if (
			price.amount instanceof Money &&
			typeof price.formatter === 'function'
		) {
			return price.formatter.formatNumber(
				price.amount.toNumber()
			);
		}
	}
	return defaultValue;
};

/**
 * @function
 * @param {Object} formData
 * @param {Object} ticket
 * @return {Object} form data
 */
const buildTicketData = ( formData, ticket ) => {
	formData.ticketID = ticket.id;
	formData.ticketIsTaxable = ticket.taxable;
	formData.ticketTotal = getPriceAmount( ticket.price, null );
	formData.reverseCalculate = !! ticket.reverseCalculate;
	return formData;
};

/**
 * @function
 * @param {Object} formData
 * @param {Object} ticket
 * @param {Array} prices
 * @return {Object} form data
 */
const buildPricesData = ( formData, ticket, prices ) => {
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
			formData[ `${ pricePrefix }-type` ] = parseInt( price.prtId, 10 );
			formData[ `${ pricePrefix }-name` ] = price.name || '';
			formData[ `${ pricePrefix }-desc` ] = price.desc || '';
			formData[ `${ pricePrefix }-amount` ] = getPriceAmount( price );
			formData[ `${ pricePrefix }-order` ] = parseInt( price.order, 10 );
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
 * @param {Object} ticket
 * @param {Array} prices
 * @return {Object} form data
 */
const useTicketPriceCalculatorFormSchema = ( ticket, prices ) => useMemo(
	() => {
		if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
			return {};
		}
		let formData = {};
		formData = buildTicketData( formData, ticket );
		formData = buildPricesData( formData, ticket, prices );
		return formData;
	}, [
		ticket.id,
		ticket.taxable,
		ticket.price.amount,
		ticket.reverseCalculate,
		prices,
	]
);
export default useTicketPriceCalculatorFormSchema;
