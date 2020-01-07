import PriceAmountInput from './PriceAmountInput';
import PriceDescriptionInput from './PriceDescriptionInput';
import PriceIdInput from './PriceIdInput';
import PriceNameInput from './PriceNameInput';
import PriceModifierActions from './PriceModifierActions';
import PriceTypeInput from './PriceTypeInput';
import usePriceTypes from '../../data/queries/priceTypes/usePriceTypes';
import { getPriceModifiers } from '../../../shared/predicates/prices/selectionPredicates';

// just temporary
import styles from './inlineStyles';

const TicketPriceModifierRow = ({ index, name, price, reverseCalculate, fields }) => {
	const priceTypes = usePriceTypes();
	const modifierOptions = getPriceModifiers(priceTypes);
	return (
		<tr>
			<td style={{ ...styles.colWidth7h, ...styles.cell }}>
				<PriceIdInput price={price} />
			</td>
			<td style={{ ...styles.colWidth15, ...styles.type }}>
				<PriceTypeInput price={price} priceTypes={priceTypes} modifierOptions={modifierOptions} />
			</td>
			<td style={{ ...styles.colWidth20, ...styles.cell }}>
				<PriceNameInput price={price} />
			</td>
			<td style={{ ...styles.colWidth30, ...styles.cell }}>
				<PriceDescriptionInput price={price} />
			</td>
			<td style={{ ...styles.colWidth15, ...styles.amount }}>
				<PriceAmountInput reverseCalculate={reverseCalculate} name={name} price={price} />
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
