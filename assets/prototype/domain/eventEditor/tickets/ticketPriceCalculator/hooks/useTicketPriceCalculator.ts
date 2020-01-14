import { useCallback } from 'react';

import calculateBasePrice from './calculateBasePrice';
import calculateTicketTotal from './calculateTicketTotal';
import { TpcAction, TpcCallback, TpcFormData, UpdatedTpcFormDataPath } from '../types';
import { parseAmountFromPath } from '../formDecorators/utilities';

const useTicketPriceCalculator = (): TpcCallback => {
	return useCallback((action: TpcAction): UpdatedTpcFormDataPath => {
		let result: TpcFormData;
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
