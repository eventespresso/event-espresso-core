/**
 * External imports
 */
import { isArray, isEmpty } from 'lodash';
import { SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal imports
 */
// import useGetPriceModifiersFromFormData
// 	from './use-get-price-modifiers-from-form-data';
// import getTicketIdFromFormData from './get-ticket-id-from-form-data';
import getTicketTotalFromFormData
	from './get-ticket-total-from-form-data';

// const DEFAULT_OBJECT = {};

/**
 * @function
 * @param {Object} formData
 * @param {BaseEntity[]} priceModifiers
 * @param {function} calculator  A calculator for calculating the total.
 * @return {Object} new field data
 */
const calculateTicketTotalFromModifiers = (
	formData,
	priceModifiers,
	calculator
) => {
	let total = getTicketTotalFromFormData( formData );
	if ( isArray( priceModifiers ) && ! isEmpty( priceModifiers ) ) {
		total = calculator( 0, priceModifiers );
	}
	return {
		ticketTotal: total ?
			total.toFixed( SiteCurrency.decimalPlaces ) :
			null,
	};
};

export default calculateTicketTotalFromModifiers;
