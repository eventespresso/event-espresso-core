import { useCallback, useMemo } from 'react';

import { useDataState } from '../data';
import { BaseFieldProps, PriceFieldProps, UsePrice } from './types';

type BFP = BaseFieldProps;

const usePrice = ({ field, price }: PriceFieldProps): UsePrice => {
	const { updatePrice } = useDataState();

	const getValue = useCallback<BFP['getValue']>(() => price[field], [price[field]]);

	const setValue = useCallback<BFP['setValue']>(
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
