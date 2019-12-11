/**
 * Internal imports
 */
import {useCallback} from '@wordpress/element';

/**
 * Internal imports
 */
import calculateBasePrice from './calculateBasePrice';
import calculateTicketTotal from './calculateTicketTotal';

const useTicketPriceCalculator = () => useCallback(
	(state, action) => {
		switch (action.type) {
			case 'CALCULATE_BASE_PRICE':
				return calculateBasePrice(state);
			case 'CALCULATE_TICKET_TOTAL/':
				return calculateTicketTotal(state);
			default:
				return state;
		}
	},
	[]
);


export default useTicketPriceCalculator;
