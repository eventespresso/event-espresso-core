import React from 'react';

import { useDataState } from '../data';
import BaseField from './BaseField';
import { BaseFieldProps, TicketPriceFieldProps } from './types';
import { useMoneyDisplay } from '@appServices/utilities/money';

type BFP = BaseFieldProps<number>;

const TicketPriceField: React.FC<TicketPriceFieldProps> = (props) => {
	const { ticket, updateTicketPrice } = useDataState();
	const { afterAmount, beforeAmount } = useMoneyDisplay();

	const getValue: BFP['getValue'] = (): number => ticket.price;

	const setValue: BFP['setValue'] = (value) => {
		updateTicketPrice(value);
	};

	return (
		<div className='ee-ticket-price-field'>
			<div className='ee-ticket-price-field__before-amount'>{beforeAmount}</div>
			<BaseField {...props} getValue={getValue} setValue={setValue} name={'ticket.price'} />
			<div className='ee-ticket-price-field__before-amount'>{afterAmount}</div>
		</div>
	);
};

export default TicketPriceField;
