import clone from 'ramda/src/clone';
import { Field } from 'react-final-form';
import { Button } from '@blueprintjs/core';

/**
 * Internal imports
 */
import usePriceTypes from '../../data/queries/priceTypes/usePriceTypes';
import usePriceTypeForPrice from '../../data/queries/priceTypes/usePriceTypeForPrice';
import { getPriceModifiers } from '../../../shared/predicates/prices/selectionPredicates';
import { findEntityByGuid } from '../../../shared/predicates/shared/selectionPredicates';
import useMoneyDisplay from '../../../../application/utilities/money';

// just temporary
import styles from './inlineStyles';
const percentSign = '%';

const TicketPriceModifierRow = ({ index, name, price, calcDir, fields: { push, remove, reset, sort } }) => {
	const priceTypes = usePriceTypes();
	const relatedPriceType = usePriceTypeForPrice(price.id);
	const modifierOptions = getPriceModifiers(priceTypes);
	const getPriceType = findEntityByGuid(modifierOptions);
	const { currency, formatAmount } = useMoneyDisplay();
	const options = price.isBasePrice ? priceTypes : modifierOptions;
	const sign = price.isPercent ? percentSign : currency.sign;
	let b4Price = '';
	let afterPrice = sign;
	// isPercent T  currencySignB4 T  sign appears  afterPrice
	// isPercent T  currencySignB4 F  sign appears  afterPrice
	// isPercent F  currencySignB4 F  sign appears  afterPrice
	// isPercent F  currencySignB4 T  sign appears  b4Price
	if (currency.signB4 && !price.isPercent) {
		b4Price = sign;
		afterPrice = '';
	}
	const actions = [];

	if (price.id === 'NEW_PRICE') {
		actions.push(
			<Button
				key={'add'}
				icon={'add'}
				onClick={() => {
					if (price.amount && !isNaN(price.amount)) {
						const newPrice = clone(price);
						newPrice.id = '';
						const baseType = getPriceType(newPrice.priceType);
						newPrice.order = baseType.order;
						newPrice.isDiscount = baseType.isDiscount;
						newPrice.isPercent = baseType.isPercent;
						newPrice.isTax = baseType.isTax;
						push(newPrice);
						reset(name);
						sort();
					} else {
						alert('Please enter an amount for the new price modifier.');
						return;
					}
				}}
				minimal
			/>
		);
	} else if (!price.isBasePrice) {
		actions.push(
			<Button
				key={'trash'}
				icon={'trash'}
				onClick={() => {
					remove(index);
				}}
				minimal
			/>
		);
	}
	return (
		<tr>
			<td style={{ ...styles.colWidth7h, ...styles.cell }}>
				{price.dbId}
				<Field type={'hidden'} component={'input'} initialValue={price.id} name={`${name}.id`} />
				<Field
					type={'hidden'}
					component={'input'}
					initialValue={price.isDiscount}
					name={`${name}.isDiscount`}
				/>
				<Field type={'hidden'} component={'input'} initialValue={price.isPercent} name={`${name}.isPercent`} />
			</td>
			<td style={{ ...styles.colWidth15, ...styles.type }}>
				<Field
					component={'select'}
					initialValue={relatedPriceType.id}
					name={`${name}.priceType`}
					disabled={price.isBasePrice}
					style={styles.input}
				>
					{options.map((option) => (
						<option key={option.id} value={option.id}>
							{option.name}
						</option>
					))}
				</Field>
			</td>
			<td style={{ ...styles.colWidth20, ...styles.cell }}>
				<Field
					type={'text'}
					component={'input'}
					initialValue={price.name}
					name={`${name}.name`}
					placeholder={'label...'}
					style={styles.input}
				/>
			</td>
			<td style={{ ...styles.colWidth30, ...styles.cell }}>
				<Field
					type={'text'}
					component={'input'}
					initialValue={price.desc}
					name={`${name}.desc`}
					placeholder={'description...'}
					style={styles.input}
				/>
			</td>
			<td style={{ ...styles.colWidth15, ...styles.amount }}>
				<div style={styles.money}>
					<div style={styles.b4}>{b4Price}</div>
					<div style={styles.currency}>
						<Field
							type={'number'}
							component={'input'}
							initialValue={price.amount}
							name={`${name}.amount`}
							placeholder={'amount...'}
							style={styles.number}
							disabled={calcDir && price.isBasePrice}
							format={formatAmount}
							formatOnBlur
						/>
					</div>
					<div style={styles.aft}>{afterPrice}</div>
				</div>
			</td>
			<td style={{ ...styles.colWidth7h, ...styles.actions }}>{actions}</td>
		</tr>
	);
};

export default TicketPriceModifierRow;
