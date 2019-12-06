import clone from 'ramda/src/clone';
import drop from 'ramda/src/drop';
import find from 'ramda/src/find';
import propEq from 'ramda/src/propEq';
import {Field} from 'react-final-form';
import {Button } from '@blueprintjs/core';

// just temporary
import styles from './inlineStyles';

// also temporary, needs to come from the db
const allOptions = [
	{ id: 1, type: 'Base Price', isDiscount: false, isPercent: false, order: 0 },
	{ id: 2, type: 'Percent Discount', isDiscount: true, isPercent: true, order: 20 },
	{ id: 3, type: 'Dollar Discount', isDiscount: true, isPercent: false, order: 30 },
	{ id: 4, type: 'Percent Surcharge', isDiscount: false, isPercent: true, order: 40 },
	{ id: 5, type: 'Dollar Surcharge', isDiscount: false, isPercent: false, order: 50 },
	{ id: 6, type: 'Regional Tax', isDiscount: false, isPercent: true, order: 60 },
	{ id: 7, type: 'Federal Tax', isDiscount: false, isPercent: true, order: 70 },
];
const modifierOptions = drop(1, allOptions); // removes first option
const getBaseType = (type) => find(propEq('id', Number(type)))( modifierOptions);

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

// const randomString = (length = 3) => Math.random().toString(36).substring(2, length+2);
// const fakeId = (length = 3) => join('', chain(randomString, [length, length, length]));
// console.log('%c > fakeId: ', 'color: yellow;', fakeId());

const TicketPriceModifierRow = ({ index, name, price, calcDir, fields: { push, remove, reset, sort }}) => {
	const options = price.priceType === 1 ? allOptions : modifierOptions;
	const sign = price.isPercent ? percentSign : currencySign;
	let b4Price = '';
	let afterPrice = sign;
	// isPercent T  currencySignB4 T  sign appears  afterPrice
	// isPercent T  currencySignB4 F  sign appears  afterPrice
	// isPercent F  currencySignB4 F  sign appears  afterPrice
	// isPercent F  currencySignB4 T  sign appears  b4Price
	if (currencySignB4 && ! price.isPercent) {
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
					const newPrice = clone(price);
					console.log('%c > newPrice:', 'color: #99c043;', newPrice);
					// newPrice.id = fakeId();
					newPrice.id = null;
					const baseType = getBaseType( newPrice.priceType );
					console.log( '%c > > baseType:', 'color: #99c043;', baseType );
					newPrice.order = baseType.order;
					newPrice.isDiscount = baseType.isDiscount;
					newPrice.isPercent = baseType.isPercent;
					console.log('%c > > newPrice:', 'color: #99c043;', newPrice);
					push(newPrice);
					reset(name);
					sort();
				}}
				minimal
			/>
		);
	} else if (! price.isBasePrice) {
		actions.push(
			<Button
				key={'trash'}
				icon={'trash'}
				onClick={() => {remove(index)}}
				minimal
			/>
		);
	}
	return (
		<tr>
			<td width={'7.5%'} style={styles.cell}>
				{price.dbid}
				<Field
					type={'hidden'}
					component={'input'}
					initialValue={price.id}
					name={`${name}.id`}
				/>
				<Field
					type={'hidden'}
					component={'input'}
					initialValue={price.isDiscount}
					name={`${name}.isDiscount`}
				/>
				<Field
					type={'hidden'}
					component={'input'}
					initialValue={price.isPercent}
					name={`${name}.isPercent`}
				/>
			</td>
			<td width={'15%'} style={styles.cell}>
				<Field
					component={'select'}
					initialValue={price.priceType}
					name={`${name}.priceType`}
					disabled={price.priceType === 1}
					style={styles.input}
				>
					{options.map((option) => (
						<option key={option.id} value={option.id}>
							{option.type}
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
