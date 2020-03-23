import { useEffect, useState } from 'react';
import { pick } from 'ramda';

import { useDataState } from '../data';
import { StateChangeListenerHook } from './types';

// the flags that change when priceType is changed
const pirceBooleanFlags = ['isDiscount', 'isPercent', 'isTax'];

const usePriceChangeListener: StateChangeListenerHook = (calculatePrice) => {
	const { prices } = useDataState();

	const [priceAmountsStr, setPriceAmountsStr] = useState('');
	const [booleanFlagsStr, setBooleanFlags] = useState('');
	useEffect(() => {
		// To avoid triggering the change on every render
		// collect all the prices (excluding empty/zero)
		// convert to JSON to only trigger when the value changes
		const priceAmounts = JSON.stringify(prices.map((price) => price.amount).filter(Boolean));
		const booleanFlags = JSON.stringify(prices.map((price) => pick(pirceBooleanFlags, price)));
		setPriceAmountsStr(priceAmounts);
		setBooleanFlags(booleanFlags);
	}, [prices]);
	// Because of the deps, it will run only when price amount or priceType changes
	useEffect(() => {
		calculatePrice();
		console.log('priceAmountsStr changed to: ', priceAmountsStr);
		console.log('booleanFlagsStr changed to: ', booleanFlagsStr);
	}, [priceAmountsStr, booleanFlagsStr]);
};

export default usePriceChangeListener;
