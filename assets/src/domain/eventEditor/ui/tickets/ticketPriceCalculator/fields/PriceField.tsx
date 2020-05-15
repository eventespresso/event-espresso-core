import React from 'react';

import { useDataState } from '../data';
import BaseField from './BaseField';
import { BaseFieldProps, PriceFieldProps } from './types';

type BFP = BaseFieldProps;

const PriceField: React.FC<PriceFieldProps> = ({ field, price, ...rest }) => {
	const { updatePrice } = useDataState();

	const getValue: BFP['getValue'] = () => price[field];

	const setValue: BFP['setValue'] = (value) => {
		updatePrice({ id: price.id, fieldValues: { [field]: value } });
	};

	return <BaseField {...rest} getValue={getValue} setValue={setValue} name={field} />;
};

export default PriceField;
