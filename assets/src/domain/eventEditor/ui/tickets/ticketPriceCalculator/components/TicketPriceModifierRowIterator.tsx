import React from 'react';

import TicketPriceModifierRow from './TicketPriceModifierRow';
import { useDataState } from '../data';
import AddPriceModifierButton from '../buttons/AddPriceModifierButtonData';

// just temporary
import styles from '../inlineStyles';

const TicketPriceModifierRowIterator: React.FC = () => {
	const { prices } = useDataState();

	return (
		<>
			{prices.map((price, index) => {
				return price ? (
					<TicketPriceModifierRow key={`${price.id}:${index}`} index={index} price={price} />
				) : null;
			})}
		</>
	);
};

export default TicketPriceModifierRowIterator;
