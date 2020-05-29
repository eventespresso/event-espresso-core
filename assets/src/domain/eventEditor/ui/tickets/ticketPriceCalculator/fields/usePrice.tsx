import { useCallback } from 'react';

import { useDataState } from '../data';
import { BaseFieldProps } from './types';

type BFP = BaseFieldProps;

const usePrice = ({ field, price }: any): any => {
	const { updatePrice } = useDataState();

	const getValue: BFP['getValue'] = useCallback(() => price[field], [price[field]]);

	const setValue: BFP['setValue'] = useCallback(
		(value) => {
			updatePrice({ id: price.id, fieldValues: { [field]: value } });
		},
		[updatePrice, field]
	);

	return {
		getValue,
		setValue,
	};
};

export default usePrice;
