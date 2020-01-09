/**
 * Internal imports
 */
import { useCallback } from '@wordpress/element';

/**
 * Internal imports
 */
import calculateBasePrice from './calculateBasePrice';
import calculateTicketTotal from './calculateTicketTotal';
import { parseAmountFromPath } from '../formDecorators/utilities';

const useTicketPriceCalculator = () => {
	return useCallback((action) => {
		let result;
		switch (action.type) {
			case 'CALCULATE_BASE_PRICE':
				result = calculateBasePrice(action.data);
				return parseAmountFromPath(action.path, result);
			case 'CALCULATE_TICKET_TOTAL':
				result = calculateTicketTotal(action.data);
				return parseAmountFromPath(action.path, result);
		}
	}, []);
};

export default useTicketPriceCalculator;
