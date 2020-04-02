/**
 * External imports
 */
import { isEmpty, reverse, sortBy } from 'lodash';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	basePriceCalculations,
	getPriceAmount,
	getPriceTypeForPrice,
} from '../utils';

/**
 * @function
 * @param {BaseEntity[]} prices,
 * @param {BaseEntity[]} priceTypes,
 * @return {Function} callback for calculating ticket base price from total
 */
const useTicketBasePriceCalculator = ( prices, priceTypes ) => useCallback(
	/**
	 * @function
	 * @param {number} total
	 * @return {number|null}    new ticket base price reverse calculated
	 *                          from supplied prices and total
	 */
	( total ) => {
		if ( isEmpty( prices ) ) {
			return null;
		}
		prices = reverse( sortBy( prices, [ 'order', 'id' ] ) );
		return prices.reduce(
			( currentTotal, priceEntity ) => {
				const priceTypeEntity = getPriceTypeForPrice(
					priceEntity,
					priceTypes
				);
				return basePriceCalculations(
					currentTotal,
					priceTypeEntity.PBT_ID,
					priceTypeEntity.isPercent,
					getPriceAmount( priceEntity )
				);
			},
			total
		);
	},
	[ prices, priceTypes ]
);

export default useTicketBasePriceCalculator;
