import { Calculation } from 'final-form-calculate';

import { TpcFormData, UpdatedTpcFormDataPath } from '../types';
import { amountsEqual, getFromFormData } from './utilities';
import useTicketPriceCalculator from '../hooks/useTicketPriceCalculator';

const useTicketTotalDecorator = (): Calculation => {
	const calculator = useTicketPriceCalculator();
	return {
		field: 'ticket.price',
		isEqual: amountsEqual,
		updates: (value, name, formData: TpcFormData): UpdatedTpcFormDataPath => {
			const reverseCalc = getFromFormData('ticket.reverseCalculate', formData);
			// we don't want to update the base price if reverse calculate is false
			if (reverseCalc) {
				return calculator({
					data: formData,
					path: 'prices[0].amount',
					type: 'CALCULATE_BASE_PRICE',
				});
			}
			return {};
		},
	};
};

export default useTicketTotalDecorator;
