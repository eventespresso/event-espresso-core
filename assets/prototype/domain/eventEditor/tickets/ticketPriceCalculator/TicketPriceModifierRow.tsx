import React from 'react';

import PriceAmountInput from './PriceAmountInput';
import PriceDescriptionInput from './PriceDescriptionInput';
import PriceIdInput from './PriceIdInput';
import PriceNameInput from './PriceNameInput';
import PriceModifierActions from './PriceModifierActions';
import PriceTypeInput from './PriceTypeInput';
import { TpcModifierFormRowProps } from './types';
import usePriceTypes from '../../data/queries/priceTypes/usePriceTypes';
import { getPriceModifiers } from '../../../shared/predicates/prices/selectionPredicates';

// just temporary
import styles from './inlineStyles';

const TicketPriceModifierRow: React.FunctionComponent<TpcModifierFormRowProps> = ({
	index,
	name,
	price,
	reverseCalculate,
	fields,
}): JSX.Element => {
	const priceTypes = usePriceTypes();
	const modifierOptions = getPriceModifiers(priceTypes);
	return (
		<tr>
			<td style={{ ...styles.colWidth7h, ...styles.cell }}>
				<PriceIdInput name={name} price={price} />
			</td>
			<td style={{ ...styles.colWidth15, ...styles.type }}>
				<PriceTypeInput name={name} price={price} priceTypes={priceTypes} modifierOptions={modifierOptions} />
			</td>
			<td style={{ ...styles.colWidth20, ...styles.cell }}>
				<PriceNameInput name={name} price={price} />
			</td>
			<td style={{ ...styles.colWidth30, ...styles.cell }}>
				<PriceDescriptionInput name={name} price={price} />
			</td>
			<td style={{ ...styles.colWidth15, ...styles.amount }}>
				<PriceAmountInput name={name} price={price} reverseCalculate={reverseCalculate} />
			</td>
			<td style={{ ...styles.colWidth7h, ...styles.actions }}>
				<PriceModifierActions
					fields={fields}
					index={index}
					modifierOptions={modifierOptions}
					name={name}
					price={price}
				/>
			</td>
		</tr>
	);
};

export default TicketPriceModifierRow;
