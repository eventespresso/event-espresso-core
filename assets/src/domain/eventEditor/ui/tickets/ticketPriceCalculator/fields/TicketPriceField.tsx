import React from 'react';

import { useDataState } from '../data';
import BaseField from './BaseField';
import { BaseFieldProps, TicketPriceFieldProps } from './types';

type BFP = BaseFieldProps<number>;

const TicketPriceField: React.FC<TicketPriceFieldProps> = (props) => {
	const { ticket, updateTicketPrice } = useDataState();

	const getValue: BFP['getValue'] = (): number => ticket.price;

	const setValue: BFP['setValue'] = (value) => {
		updateTicketPrice(value);
	};

	return <BaseField {...props} getValue={getValue} setValue={setValue} name={'ticket.price'} />;
};

export default TicketPriceField;
