/**
 * External imports
 */
import {useCallback} from '@wordpress/element';

/**
 * Internal imports
 */
import useCalculateBasePrice from './useCalculateBasePrice';
import useCalculateTotal from './useCalculateTotal';

const useTicketPriceCalculator = () => useCallback((state, action) => {
	switch (action.type) {
		case 'CALCULATE_BASE_PRICE':
			return useCalculateBasePrice(state);
		case 'CALCULATE_TOTAL':
			return useCalculateTotal(state);
		default:
			return state;
	}
}, [
	useCalculateBasePrice,
	useCalculateTotal,
] );

export default useTicketPriceCalculator;
