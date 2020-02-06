// @ts-nocheck
import React from 'react';

import PriceAmountInput from './inputs/PriceAmountInput';
import PriceDescriptionInput from './inputs/PriceDescriptionInput';
import PriceIdInput from './inputs/PriceIdInput';
import PriceNameInput from './inputs/PriceNameInput';
import PriceModifierActions from './buttons/PriceModifierActions';
import PriceTypeInput from './inputs/PriceTypeInput';
import { TpcModifierFormRowProps } from './types';
import usePriceTypes from '../../../services/apollo/queries/priceTypes/usePriceTypes';
import { getPriceModifiers } from '../../../../shared/entities/priceTypes/predicates/selectionPredicates';

// just temporary
import styles from './inlineStyles';

const TicketPriceModifierRow: React.FC<TpcModifierFormRowProps> = ({
	index,
	name,
	price,
	reverseCalculate,
	fields,
}) => {
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
				<PriceModifierActions fields={fields} index={index} name={name} price={price} />
			</td>
		</tr>
	);
};

export default TicketPriceModifierRow;
