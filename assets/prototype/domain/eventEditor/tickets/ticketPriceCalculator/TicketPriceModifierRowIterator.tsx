import React from 'react';

import TicketPriceModifierRow from './TicketPriceModifierRow';
import { FieldArrayProps } from './types';

const TicketPriceModifierRowIterator: React.ReactNode = ({ fields }: FieldArrayProps, reverseCalculate: boolean) => {
	const { push, remove, reset, sort } = fields;
	return fields.map((name, index) => {
		const price = fields.value[index];
		return price ? (
			<TicketPriceModifierRow
				key={`${price.id}:${index}`}
				index={index}
				name={name}
				fields={{ push, remove, reset, sort }}
				price={price}
				reverseCalculate={reverseCalculate}
			/>
		) : null;
	});
};

export default TicketPriceModifierRowIterator;
