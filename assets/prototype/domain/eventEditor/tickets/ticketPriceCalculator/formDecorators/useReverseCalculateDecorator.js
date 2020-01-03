import { boolsEqual, getFromFormData } from './utilities';
import useTicketPriceCalculator from '../hooks/useTicketPriceCalculator';

const useReverseCalculateDecorator = () => {
	const calculator = useTicketPriceCalculator();
	return {
		field: 'ticket.reverseCalculate',
		isEqual: boolsEqual,
		updates: (value, name, formData) => {
			const reverseCalc = getFromFormData('ticket.reverseCalculate', formData);
			return reverseCalc
				? calculator({
						data: formData,
						path: 'prices[0].amount',
						type: 'CALCULATE_BASE_PRICE',
				  })
				: calculator({
						data: formData,
						path: 'ticket.price',
						type: 'CALCULATE_TICKET_TOTAL',
				  });
		},
	};
};

export default useReverseCalculateDecorator;
