/**
 * Internal imports
 */
import useCalculateBasePrice from './useCalculateBasePrice';
import useCalculateTotal from './useCalculateTotal';

const useTicketPriceCalculator = (state, action) => {
	switch (action.type) {
		case 'CALCULATE_BASE_PRICE':
			return useCalculateBasePrice(state);
		case 'CALCULATE_TOTAL':
			return useCalculateTotal(state);
		default:
			return state;
	}
};

export default useTicketPriceCalculator;
