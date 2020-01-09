import { amountsEqual, getFromFormData } from './utilities';
import useTicketPriceCalculator from '../hooks/useTicketPriceCalculator';

const usePriceAmountDecorator = () => {
	const calculator = useTicketPriceCalculator();
	return {
		field: /^prices\[\d+\]\.amount$/,
		isEqual: amountsEqual,
		updates: (value, name, formData) => {
			const reverseCalc = getFromFormData('ticket.reverseCalculate', formData);
			if (reverseCalc) {
				if (name === 'prices[0].amount') {
					return {};
				}
				return calculator({
					data: formData,
					path: 'prices[0].amount',
					type: 'CALCULATE_BASE_PRICE',
				});
			}
			return calculator({
				data: formData,
				path: 'ticket.price',
				type: 'CALCULATE_TICKET_TOTAL',
			});
		},
	};
};

export default usePriceAmountDecorator;
