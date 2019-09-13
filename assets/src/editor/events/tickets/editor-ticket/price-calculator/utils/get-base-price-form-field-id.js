/**
 * External imports
 */
import { normalizeEntityId } from '@eventespresso/helpers';
import { priceTypeModel } from '@eventespresso/model';

/**
 * Internal imports
 */
import { TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX } from '../constants';

const { BASE_PRICE_TYPES } = priceTypeModel;

/**
 * @function
 * @param {number|string} ticketId
 * @param {Object} formData
 * @return {string} form field name
 */
const getBasePriceFormFieldId = ( ticketId, formData ) => {
	const basePrefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX +
		`-ticket-${ ticketId }-price`;
	if ( ! formData.priceIDs ) {
		return '';
	}
	const priceIDs = formData.priceIDs.split( ',' );
	for ( const priceID of priceIDs ) {
		const prefix = `${ basePrefix }-${ priceID }`;
		const priceTypeId = typeof formData[ `${ prefix }-type` ] !== 'undefined' ?
			normalizeEntityId( formData[ `${ prefix }-type` ] ) :
			null;
		// base prices have a type id of 1
		if ( priceTypeId === BASE_PRICE_TYPES.BASE_PRICE ) {
			const basePrice = typeof formData[ `${ prefix }-amount` ] !== 'undefined' ?
				formData[ `${ prefix }-amount` ] :
				null;
			if ( basePrice !== null ) {
				return `${ prefix }-amount`;
			}
		}
	}
	return '';
};

export default getBasePriceFormFieldId;
