import { useCallback } from 'react';

import { useDataState } from '../data';
import { calculateBasePrice, calculateTicketTotal } from '../utils';
import usePriceChangeListener from './usePriceChangeListener';
import usePriceTypeChangeListener from './usePriceTypeChangeListener';
import useTicketTotalChangeListener from './useTicketTotalChangeListener';
import { useMoneyDisplay } from '@application/services';

const useStateListeners = (): void => {
	const { getData, reverseCalculate, setPrices, updateTicketPrice } = useDataState();
	const { formatAmount } = useMoneyDisplay();

	const updateBasePrice = useCallback(() => {
		const newPrices = calculateBasePrice(getData(), formatAmount);
		setPrices(newPrices);
	}, [getData, setPrices]);

	const updateTicketTotal = useCallback(() => {
		const ticketTotal = calculateTicketTotal(getData());
		updateTicketPrice(parseFloat(formatAmount(ticketTotal)));
	}, [getData, updateTicketPrice]);

	const calculatePrice = useCallback(() => {
		if (reverseCalculate) {
			updateBasePrice();
		} else {
			updateTicketTotal();
		}
	}, [reverseCalculate, updateBasePrice, updateTicketTotal]);

	// Subscribe to price related changes.
	usePriceChangeListener(calculatePrice);
	// Subscribe to price priceType changes
	usePriceTypeChangeListener();
	// Subscribe to ticket price changes
	useTicketTotalChangeListener(calculatePrice);
};

export default useStateListeners;
