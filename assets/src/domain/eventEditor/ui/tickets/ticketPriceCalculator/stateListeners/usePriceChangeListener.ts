import { useEffect, useState } from 'react';
import { pick } from 'ramda';

import { useDataState } from '../data';
import { StateChangeListenerHook } from './types';

// the flags that change when priceType is changed
const priceBooleanFlags = ['isDiscount', 'isPercent', 'isTax'];

const usePriceChangeListener: StateChangeListenerHook = (calculatePrice) => {
	const { prices } = useDataState();

	const [priceAmountsStr, setPriceAmountsStr] = useState('');
	const [booleanFlagsStr, setBooleanFlagsStr] = useState('');

	useEffect(() => {
		// To avoid triggering the change on every render
		// collect all the prices (excluding empty/zero)
		// convert to JSON to only trigger when the value changes
		const newPriceAmountsStr = JSON.stringify(prices.map((price) => price.amount).filter(Boolean));
		const newBooleanFlagsStr = JSON.stringify(prices.map((price) => pick(priceBooleanFlags, price)));

		if (newPriceAmountsStr === priceAmountsStr && newBooleanFlagsStr === booleanFlagsStr) {
			return;
		}
		calculatePrice();

		setPriceAmountsStr(newPriceAmountsStr);
		setBooleanFlagsStr(newBooleanFlagsStr);
	}, [prices]);
};

export default usePriceChangeListener;
