/**
 * External imports
 */
import { useCallback } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal imports
 */
import parseMoneyValue from '../utils/parse-money-value';
import { TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX } from '../constants';

/**
 * Updates price modifiers based on the supplied form data.
 * This should mostly be unnecessary as the form inputs should update
 * the price modifiers directly upon change. So this is merely some added
 * redundancy to ensure that price modifiers are in sync with form data.
 *
 * @function
 * @return {Function} callback for updating price modifiers from form data
 */
const useUpdatePriceModifiersFromFormData = () => useCallback(
	/**
	 * @function
	 * @param {BaseEntity[]} priceModifiers,
	 * @param {Object} formData,
	 */
	( priceModifiers, formData ) => {
		const ticketId = formData.ticketID ? formData.ticketID : null;
		if ( ! ticketId ) {
			return;
		}
		const basePrefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX +
			`-ticket-${ ticketId }-price`;
		priceModifiers.forEach(
			( price ) => {
				if ( ! isModelEntityOfModel( price, 'price' ) ) {
					return;
				}
				const key = `${ basePrefix }-${ price.id }-amount`;
				const newPrice = formData[ key ] ?
					parseMoneyValue( formData[ key ] ) :
					null;
				if (
					newPrice !== null &&
					newPrice !== price.amount.toNumber()
				) {
					price.amount = new Money( newPrice, SiteCurrency );
				}
			}
		);
	},
	[]
);

export default useUpdatePriceModifiersFromFormData;
