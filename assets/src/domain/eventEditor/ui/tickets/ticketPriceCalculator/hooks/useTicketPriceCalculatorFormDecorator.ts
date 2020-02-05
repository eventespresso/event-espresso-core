import { Decorator } from 'final-form';
import createDecorator from 'final-form-calculate';

import usePriceAmountDecorator from '../formDecorators/usePriceAmountDecorator';
import usePriceTypeDecorator from '../formDecorators/usePriceTypeDecorator';
import useReverseCalculateDecorator from '../formDecorators/useReverseCalculateDecorator';
import useTicketTotalDecorator from '../formDecorators/useTicketTotalDecorator';

/**
 * a form decorator used for capturing form data
 * so that the ticket price calculator can process changes
 *
 * @return {Decorator}  decorator callback for react-final-form
 */
const useTicketPriceCalculatorFormDecorator = (): Decorator => {
	const priceAmountDecorator = usePriceAmountDecorator();
	const priceTypeDecorator = usePriceTypeDecorator();
	const reverseCalculateDecorator = useReverseCalculateDecorator();
	const ticketTotalDecorator = useTicketTotalDecorator();
	return createDecorator(priceAmountDecorator, priceTypeDecorator, reverseCalculateDecorator, ticketTotalDecorator);
};

export default useTicketPriceCalculatorFormDecorator;
