import React, { useCallback } from 'react';

import { useDataState } from '../data';
import BaseField from './BaseField';
import { BaseFieldProps, TicketPriceFieldProps } from './types';
import TicketPriceField from './TicketPriceField';
import { useMoneyDisplay } from '@appServices/utilities/money';

type BFP = BaseFieldProps<number>;

const PriceField: React.FC<TicketPriceFieldProps> = (props) => {
	const { ticket, updateTicketPrice } = useDataState();
	const { afterAmount, beforeAmount } = useMoneyDisplay();

	const getValue: BFP['getValue'] = useCallback(() => ticket?.price || 0, [ticket?.price]);

	const setValue: BFP['setValue'] = useCallback((value) => updateTicketPrice(value), [updateTicketPrice]);

	return (
		<TicketPriceField
			after={afterAmount}
			before={beforeAmount}
			field={<BaseField {...props} getValue={getValue} setValue={setValue} name={'ticket.price'} />}
		/>
	);
};

export default PriceField;
