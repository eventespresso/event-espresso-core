import { Calculation } from 'final-form-calculate';

import { TpcActionType, TpcFormData, UpdatedTpcFormDataPath } from '../types';
import { boolsEqual, getFromFormData } from './utilities';
import useTicketPriceCalculator from '../hooks/useTicketPriceCalculator';

const useReverseCalculateDecorator = (): Calculation => {
	const calculator = useTicketPriceCalculator();
	return {
		field: 'ticket.reverseCalculate',
		isEqual: boolsEqual,
		updates: (value, name, formData: TpcFormData): UpdatedTpcFormDataPath => {
			const reverseCalc = getFromFormData('ticket.reverseCalculate', formData);
			return reverseCalc
				? calculator({
						data: formData,
						path: 'prices[0].amount',
						type: TpcActionType.CalculateBasePrice,
				  })
				: calculator({
						data: formData,
						path: 'ticket.price',
						type: TpcActionType.CalculateTicketTotal,
				  });
		},
	};
};

export default useReverseCalculateDecorator;
