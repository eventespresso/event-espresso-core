import clone from 'ramda/src/clone';
import { Field } from 'react-final-form';
import { Button } from '@blueprintjs/core';

/**
 * Internal imports
 */
import usePriceTypes from '../../containers/queries/usePriceTypes';
import usePriceTypeForPrice from '../../containers/queries/usePriceTypeForPrice';
import { getPriceModifiers } from '../../../shared/predicates/prices/selectionPredicates';
import { findPriceTypeByGuid } from '../../../shared/predicates/priceTypes/selectionPredicates';

// just temporary
import styles from './inlineStyles';

// need to change these based on site i18n config
const currencySign = '$';
const currencySignB4 = true;
const decimalPlaces = 2;
// const decimalMark = '.';
// const thousandsSep = ',';
const percentSign = '%';

function formatPriceAmount(amount) {
	return Number.parseFloat(amount).toFixed(decimalPlaces);
}

const TicketPriceModifierRow = ({ index, name, price, calcDir, fields: { push, remove, reset, sort } }) => {
	console.log('%c TicketPriceModifierRow: ', 'color: lime; font-size:14px;');
	console.log('%c > price: ', 'color: lime;', price);
	const priceTypes = usePriceTypes();
	const relatedPriceType = usePriceTypeForPrice(price.id);
	console.log('%c > relatedPriceType: ', 'color: lime;', relatedPriceType);
	const modifierOptions = getPriceModifiers(priceTypes);
	const getPriceType = findPriceTypeByGuid(modifierOptions);
	const options = price.isBasePrice ? priceTypes : modifierOptions;
	const sign = price.isPercent ? percentSign : currencySign;
	let b4Price = '';
	let afterPrice = sign;
	// isPercent T  currencySignB4 T  sign appears  afterPrice
	// isPercent T  currencySignB4 F  sign appears  afterPrice
	// isPercent F  currencySignB4 F  sign appears  afterPrice
	// isPercent F  currencySignB4 T  sign appears  b4Price
	if (currencySignB4 && !price.isPercent) {
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
					if (price.name && price.amount && !isNaN(price.amount)) {
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
						alert('Please enter the price name and amount.');
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
			<td width={'7.5%'} style={styles.cell}>
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
			<td width={'15%'} style={styles.cell}>
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
			<td width={'20%'} style={styles.cell}>
				<Field
					type={'text'}
					component={'input'}
					initialValue={price.name}
					name={`${name}.name`}
					placeholder={'label...'}
					style={styles.input}
				/>
			</td>
			<td width={'30%'} style={styles.cell}>
				<Field
					type={'text'}
					component={'input'}
					initialValue={price.desc}
					name={`${name}.desc`}
					placeholder={'description...'}
					style={styles.input}
				/>
			</td>
			<td width={'15%'} style={styles.amount}>
				<div style={styles.money}>
					<div style={styles.b4}>{b4Price}</div>
					<div style={styles.Currency}>
						<Field
							type={'number'}
							component={'input'}
							initialValue={price.amount}
							name={`${name}.amount`}
							placeholder={'amount...'}
							style={styles.number}
							disabled={calcDir && price.isBasePrice}
							format={formatPriceAmount}
							formatOnBlur
						/>
					</div>
					<div style={styles.aft}>{afterPrice}</div>
				</div>
			</td>
			<td width={'7.5%'} style={styles.actions}>
				{actions}
			</td>
		</tr>
	);
};

export default TicketPriceModifierRow;
