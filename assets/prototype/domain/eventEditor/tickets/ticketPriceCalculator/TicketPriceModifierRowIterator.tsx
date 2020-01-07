import React from 'react';

import TicketPriceModifierRow from './TicketPriceModifierRow';
import { Price } from '../../data/types';

interface Mutators {
	fields: {
		map: <R>(iterator: (name: string, index: number) => R) => R[];
		push: (value: Price) => void;
		remove: (index: number) => Price;
		reset: (name: string) => void;
		sort: () => void;
		value: Price[];
	};
}

const TicketPriceModifierRowIterator: React.ReactNode = ({ fields }: Mutators, calcDir: boolean) => {
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
				calcDir={calcDir}
			/>
		) : null;
	});
};

export default TicketPriceModifierRowIterator;
