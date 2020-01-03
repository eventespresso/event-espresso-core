import { amountsEqual, getFromFormData } from './utilities';
import useTicketPriceCalculator from '../hooks/useTicketPriceCalculator';

const useTicketTotalDecorator = () => {
	const calculator = useTicketPriceCalculator();
	return {
		field: 'ticket.price',
		isEqual: amountsEqual,
		updates: (value, name, formData) => {
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
