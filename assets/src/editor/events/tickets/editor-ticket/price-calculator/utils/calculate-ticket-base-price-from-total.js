/**
 * External imports
 */
import { isArray, isEmpty } from 'lodash';
import { SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal imports
 */
import getBasePriceFormFieldId from './get-base-price-form-field-id';
import getTicketIdFromFormData from './get-ticket-id-from-form-data';
import getTicketTotalFromFormData
	from './get-ticket-total-from-form-data';

const DEFAULT_OBJECT = {};

/**
 * @function
 * @param {Object} formData
 * @param {BaseEntity[]} priceModifiers
 * @param {function} calculator  A calculator for calculating the total.
 * @return {Object} new field data
 */
const calculateTicketBasePriceFromTotal = (
	formData,
	priceModifiers,
	calculator
) => {
	const ticketId = getTicketIdFromFormData( formData );
	if ( ! ticketId ) {
		return DEFAULT_OBJECT;
	}
	const basePriceFormFieldID = getBasePriceFormFieldId( ticketId, formData );
	if ( basePriceFormFieldID === '' ) {
		return DEFAULT_OBJECT;
	}
	let newPrice = getTicketTotalFromFormData( formData );
	if ( isArray( priceModifiers ) && ! isEmpty( priceModifiers ) ) {
		newPrice = calculator( newPrice, priceModifiers );
	}
	return {
		[ basePriceFormFieldID ]: newPrice ?
			newPrice.toFixed( SiteCurrency.decimalPlaces ) :
			null,
	};
};

export default calculateTicketBasePriceFromTotal;
