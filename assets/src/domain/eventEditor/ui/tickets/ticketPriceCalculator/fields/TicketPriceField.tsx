import React, { useCallback } from 'react';

import { useDataState } from '../data';
import BaseField from './BaseField';
import { BaseFieldProps, TicketPriceFieldProps } from './types';
import { useMoneyDisplay } from '@appServices/utilities/money';

type BFP = BaseFieldProps<number>;

const TicketPriceField: React.FC<TicketPriceFieldProps> = (props) => {
	const { ticket, updateTicketPrice } = useDataState();
	const { afterAmount, beforeAmount } = useMoneyDisplay();

	const getValue: BFP['getValue'] = useCallback(() => ticket?.price || 0, [ticket?.price]);

	const setValue: BFP['setValue'] = useCallback((value) => updateTicketPrice(value), [updateTicketPrice]);

	return (
		<div className='ee-ticket-price-field'>
			<div className='ee-ticket-price-field__before'>{beforeAmount}</div>
			<BaseField {...props} getValue={getValue} setValue={setValue} name={'ticket.price'} />
			<div className='ee-ticket-price-field__after'>{afterAmount}</div>
		</div>
	);
};

export default TicketPriceField;
