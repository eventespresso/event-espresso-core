import React from 'react';

import TicketPriceModifierRow from './TicketPriceModifierRow';
import { useDataState } from './data';
import AddPriceModifierButton from './buttons/AddPriceModifierButtonData';

// just temporary
import styles from './inlineStyles';

const TicketPriceModifierRowIterator: React.FC = () => {
	const { prices } = useDataState();

	return (
		<>
			{prices.map((price, index) => {
				return price ? (
					<TicketPriceModifierRow key={`${price.id}:${index}`} index={index} price={price} />
				) : null;
			})}
			<tr>
				<td colSpan={5}></td>
				<td style={{ ...styles.colWidth7h, ...styles.actions }}>
					<AddPriceModifierButton index={prices.length} />
				</td>
			</tr>
		</>
	);
};

export default TicketPriceModifierRowIterator;
