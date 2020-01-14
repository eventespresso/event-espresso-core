import { useCallback } from 'react';

import calculateBasePrice from './calculateBasePrice';
import calculateTicketTotal from './calculateTicketTotal';
import { TpcAction, TpcActionType, TpcCallback, TpcFormData, UpdatedTpcFormDataPath } from '../types';
import { parseAmountFromPath } from '../formDecorators/utilities';

const useTicketPriceCalculator = (): TpcCallback => {
	return useCallback((action: TpcAction): UpdatedTpcFormDataPath => {
		let result: TpcFormData;
		switch (action.type) {
			case TpcActionType.CalculateBasePrice:
				result = calculateBasePrice(action.data);
				return parseAmountFromPath(action.path, result);
			case TpcActionType.CalculateTicketTotal:
				result = calculateTicketTotal(action.data);
				return parseAmountFromPath(action.path, result);
		}
	}, []);
};

export default useTicketPriceCalculator;
