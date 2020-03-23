import { useEffect, useRef, useState } from 'react';
import { assocPath, pathOr } from 'ramda';

import { AnyObject } from '@appServices/utilities/types';
import { useDataState } from '../data';
import { useUpdatePriceTypeForPrice } from '../utils';
import { StateChangeListenerHook } from './types';

const usePriceTypeChangeListener: StateChangeListenerHook = () => {
	const { getData, prices, updatePrice } = useDataState();

	const updatePriceTypeForPrice = useUpdatePriceTypeForPrice();

	/**
	 * To store the previous values of priceTypes for all prices
	 * {
	 *     [price.id]: price.priceType
	 * }
	 */
	const priceTypeMapping = useRef<AnyObject<string>>({});

	const [priceTypesStr, setPriceTypesStr] = useState('');
	useEffect(() => {
		// To avoid triggering the change on every render
		// convert to JSON to only trigger when the value changes
		const newPriceTypesStr = JSON.stringify(prices.map((price) => price.priceType));
		setPriceTypesStr(newPriceTypesStr);
	}, [prices]);
	// Because of the deps, it will run only when priceTypes changes
	useEffect(() => {
		const newPriceTypeMapping = prices.reduce((acc, price) => {
			return assocPath([price.id], price.priceType, acc);
		}, {});
		// id of the price whose priceType has changed
		let priceTypeChangedForPriceId = '';
		// loop through all the new priceType mappings to
		// get the id of the price whose price type changed
		for (const [priceId, newPriceType] of Object.entries<string>(newPriceTypeMapping)) {
			const prevPriceType = pathOr('', ['current', priceId], priceTypeMapping);
			if (prevPriceType && prevPriceType !== newPriceType) {
				priceTypeChangedForPriceId = priceId;
				break;
			}
		}
		// Make sure we got the price ID
		if (priceTypeChangedForPriceId) {
			// Update the fields for the price
			const updatedPrice = updatePriceTypeForPrice(priceTypeChangedForPriceId, getData());
			// If we are lucky
			if (updatedPrice) {
				const { id, ...fieldValues } = updatedPrice;
				// Update the price in state
				updatePrice({ id, fieldValues });
			}
		}
		// Make sure to update the mapping
		priceTypeMapping.current = newPriceTypeMapping;
		console.log('priceTypeChangedForPriceId: ', priceTypeChangedForPriceId);
	}, [priceTypesStr]);
};

export default usePriceTypeChangeListener;
