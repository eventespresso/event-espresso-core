import { useCallback, useMemo } from 'react';

import { useDataState } from '../data';
import { BaseFieldProps, PriceFieldProps, UsePrice } from './types';

type BFP = BaseFieldProps;

const usePrice = ({ field, price }: PriceFieldProps): UsePrice => {
	const { updatePrice } = useDataState();

	const getValue: BFP['getValue'] = useCallback(() => price[field], [price[field]]);

	const setValue: BFP['setValue'] = useCallback(
		(value) => {
			updatePrice({ id: price.id, fieldValues: { [field]: value } });
		},
		[updatePrice, field]
	);

	return useMemo(
		() => ({
			getValue,
			setValue,
		}),
		[getValue, setValue]
	);
};

export default usePrice;
