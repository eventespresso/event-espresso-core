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
		setPriceAmountsStr(newPriceAmountsStr);
		setBooleanFlagsStr(newBooleanFlagsStr);
	}, [prices]);
	// Because of the deps, it will run only when price amount or priceType changes
	useEffect(() => {
		calculatePrice();
		console.log('priceAmountsStr changed to: ', priceAmountsStr);
		console.log('booleanFlagsStr changed to: ', booleanFlagsStr);
	}, [priceAmountsStr, booleanFlagsStr]);
};

export default usePriceChangeListener;
