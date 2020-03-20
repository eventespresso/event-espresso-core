import React from 'react';

import PriceAmountInput from './inputs/PriceAmountInput';
import PriceDescriptionInput from './inputs/PriceDescriptionInput';
import PriceIdInput from './inputs/PriceIdInput';
import PriceNameInput from './inputs/PriceNameInput';
import PriceModifierActions from './buttons/PriceModifierActions';
import PriceTypeInput from './inputs/PriceTypeInput';
import { PriceModifierProps } from './types';

// just temporary
import styles from './inlineStyles';

const TicketPriceModifierRow: React.FC<PriceModifierProps> = ({ index, price }) => {
	return (
		<>
			<tr>
				<td style={{ ...styles.colWidth7h, ...styles.cell }}>
					<PriceIdInput price={price} />
				</td>
				<td style={{ ...styles.colWidth15, ...styles.type }}>
					<PriceTypeInput price={price} />
				</td>
				<td style={{ ...styles.colWidth20, ...styles.cell }}>
					<PriceNameInput price={price} />
				</td>
				<td style={{ ...styles.colWidth30, ...styles.cell }}>
					<PriceDescriptionInput price={price} />
				</td>
				<td style={{ ...styles.colWidth15, ...styles.amount }}>
					<PriceAmountInput price={price} />
				</td>
				<td style={{ ...styles.colWidth7h, ...styles.actions }}>
					<PriceModifierActions index={index} price={price} />
				</td>
			</tr>
		</>
	);
};

export default TicketPriceModifierRow;
