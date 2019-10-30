/**
 * External imports
 */
import { sortBy } from 'lodash';
import { priceTypeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import useGeneratePriceModifierRow
	from './use-generate-price-modifier-row';
import usePriceTypeOptionsForSelectInput
	from '../../../../../helpers/forms/use-price-type-options-for-select-input';
import '../style.css';

const { BASE_PRICE_TYPES } = priceTypeModel;

/**
 * @function
 * @param {BaseEntity} ticket
 * @param {string} ticketPrefix
 * @param {BaseEntity[]} prices
 * @param {Object} values form data
 * @return {Array} array of useGeneratePriceModifierRow objects
 */
const useTicketPriceCalculatorFormRows = (
	ticket,
	ticketPrefix,
	prices,
	values,
) => {
	const formRows = [];
	const {
		priceTypeOptions,
		filteredPriceTypeOptions,
	} = usePriceTypeOptionsForSelectInput(
		[ BASE_PRICE_TYPES.BASE_PRICE ]
	);
	const priceCount = prices.length;
	const priceModifierRow = useGeneratePriceModifierRow(
		ticketPrefix,
		values
	);
	if ( priceCount > 0 ) {
		const sortedPrices = sortBy( prices, [ 'order', 'name' ] );
		for ( let i = 0; i < priceCount; i++ ) {
			const price = sortedPrices[ i ];
			if ( isModelEntityOfModel( price, 'price' ) ) {
				// we don't want "Base Price" to be an option for
				// price modifiers because THERE CAN ONLY BE ONE!!!
				const options = price.PRT_ID === BASE_PRICE_TYPES.BASE_PRICE ?
					priceTypeOptions :
					filteredPriceTypeOptions;
				const lastRow = i === ( priceCount - 1 );
				formRows.push(
					priceModifierRow( ticket, price, options, lastRow )
				);
			}
		}
	}
	return formRows;
};

export default useTicketPriceCalculatorFormRows;
