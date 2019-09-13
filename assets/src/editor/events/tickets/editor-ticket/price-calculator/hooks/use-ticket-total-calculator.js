/**
 * External imports
 */
import { isEmpty, sortBy } from 'lodash';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	getPriceAmount,
	getPriceTypeForPrice,
	ticketTotalCalculations,
} from '../utils/';

/**
 * @function
 * @param {BaseEntity[]} prices,
 * @param {BaseEntity[]} priceTypes,
 * @return {Function} callback for calculating ticket total from base price
 */
const useTicketTotalCalculator = ( prices, priceTypes ) => useCallback(
	/**
	 * @function
	 * @param {number} initial
	 * @return {number|null} new ticket total as calculated by supplied prices
	 */
	( initial = 0 ) => {
		if ( isEmpty( prices ) ) {
			return null;
		}
		prices = sortBy( prices, [ 'order', 'id' ] );
		return prices.reduce(
			( newTotal, priceEntity ) => {
				const priceTypeEntity = getPriceTypeForPrice(
					priceEntity,
					priceTypes
				);
				return ticketTotalCalculations(
					newTotal,
					priceTypeEntity.pbtId,
					priceTypeEntity.isPercent,
					getPriceAmount( priceEntity )
				);
			},
			initial
		);
	},
	[ prices, priceTypes ]
);

export default useTicketTotalCalculator;
