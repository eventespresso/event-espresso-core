/**
 * External imports
 */
import { isArray, isEmpty, uniq } from 'lodash';
import { isModelEntityOfModel } from '@eventespresso/validators';

import { TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX } from './constants';

/**
 * @function
 * @param {Object} formData
 * @param {Object} ticketEntity
 * @return {Object} form data
 */
const buildTicketDataMap = ( formData, ticketEntity ) => {
	formData.ticketID = ticketEntity.id;
	formData.ticketIsTaxable = ticketEntity.taxable;
	formData.ticketTotal = ticketEntity.price && ticketEntity.price.amount ?
		ticketEntity.price.formatter.formatNumber( ticketEntity.price.amount.toNumber() ) :
		null;
	return formData;
};

/**
 * @function
 * @param {Object} formData
 * @param {Object} ticketEntity
 * @param {Array} priceEntities
 * @return {Object} form data
 */
const buildPricesDataMap = ( formData, ticketEntity, priceEntities ) => {
	if ( ! isArray( priceEntities ) || priceEntities.length === 0 ) {
		return {};
	}
	let prefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
	prefix += '-ticket-' + ticketEntity.id + '-price';
	const priceIDs = [];
	const priceTypes = [];
	priceEntities.forEach( ( priceEntity ) => {
		if ( isModelEntityOfModel( priceEntity, 'price' ) ) {
			const priceId = shortenCuid( priceEntity.id );
			priceIDs.push( priceId );
			priceTypes.push( priceEntity.prtId );
			const pricePrefix = `${ prefix }-${ priceId }`;
			formData[ `${ pricePrefix }-id` ] = priceId;
			formData[ `${ pricePrefix }-type` ] = parseInt( priceEntity.prtId, 10 );
			formData[ `${ pricePrefix }-name` ] = priceEntity.name || '';
			formData[ `${ pricePrefix }-desc` ] = priceEntity.desc || '';
			formData[ `${ pricePrefix }-amount` ] = priceEntity.amount &&
			priceEntity.amount.amount ?
				priceEntity.amount.formatter.formatNumber(
					priceEntity.amount.amount.toNumber()
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
 * @param {Object} ticketEntity
 * @param {Array} priceEntities
 * @param {boolean} reverseCalculate
 * @return {Object} form data
 */
export const ticketPriceCalculatorFormDataMap = (
	ticketEntity,
	priceEntities,
	reverseCalculate
) => {
	if ( ! isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
		return {};
	}
	let formData = {};
	formData = buildTicketDataMap( formData, ticketEntity );
	formData = buildPricesDataMap( formData, ticketEntity, priceEntities );
	formData.reverseCalculate = !! reverseCalculate;
	return formData;
};
