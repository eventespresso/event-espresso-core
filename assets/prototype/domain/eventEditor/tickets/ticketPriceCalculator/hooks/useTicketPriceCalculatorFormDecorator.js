/**
 * External imports
 */
import createDecorator from 'final-form-calculate';

/**
 * Internal imports
 */
import usePriceAmountDecorator from '../formDecorators/usePriceAmountDecorator';
import usePriceTypeDecorator from '../formDecorators/usePriceTypeDecorator';
import useReverseCalculateDecorator from '../formDecorators/useReverseCalculateDecorator';
import useTicketTotalDecorator from '../formDecorators/useTicketTotalDecorator';

/**
 * a form decorator used for capturing form data
 * so that the ticket price calculator can process changes
 *
 * @return {Function}  decorator callback for react-final-form
 */
const useTicketPriceCalculatorFormDecorator = () => {
	const priceAmountDecorator = usePriceAmountDecorator();
	const priceTypeDecorator = usePriceTypeDecorator();
	const reverseCalculateDecorator = useReverseCalculateDecorator();
	const ticketTotalDecorator = useTicketTotalDecorator();
	return createDecorator(priceAmountDecorator, priceTypeDecorator, reverseCalculateDecorator, ticketTotalDecorator);
};

export default useTicketPriceCalculatorFormDecorator;
