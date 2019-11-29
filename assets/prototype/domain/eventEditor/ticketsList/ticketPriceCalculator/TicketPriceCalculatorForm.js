import { drop } from 'ramda';
import { Field } from 'react-final-form';
import { Button, H2, HTMLTable } from '@blueprintjs/core';

// actions that need replacing with mutations
const addNewPrice = () => console.log('%c addNewPrice', 'color: lime;' /*price*/);
const deletePrice = () => console.log('%c deletePrice', 'color: red;' /*price.id*/);

const hdrStyle = { margin: '1em 0 .5em' };
const tableStyle = { width: '100%' };
const cellStyle = { padding: '.5rem .25rem' };
const typeStyle = { padding: '.5rem .25rem', width: '170px' };
const inputStyle = { width: '100%' };
const amountStyle = { maxWidth: '125px', padding: '.5rem .25rem', textAlign: 'center' };
const moneyStyle = { minWidth: '185px' };
const signStyle = { boxSizing: 'border-box', display: 'inline-block', minWidth: '2rem' };
const b4Style = { ...signStyle, textAlign: 'right' };
const aftStyle = { ...signStyle, textAlign: 'left' };
const CurrencyStyle = { boxSizing: 'border-box', display: 'inline-block', margin: '0 .25em', width: 'calc(100%-4rem)' };
const divStyle = { boxSizing: 'border-box', display: 'block', margin: '0 0 1em', width: '100%' };
const actionsStyle = { ...cellStyle, textAlign: 'center' };

// needs to come from the db
const allOptions = [
	{ id: 1, type: 'Base Price' },
	{ id: 2, type: 'Percent Discount' },
	{ id: 3, type: 'Dollar Discount' },
	{ id: 4, type: 'Percent Surcharge' },
	{ id: 5, type: 'Dollar Surcharge' },
	{ id: 6, type: 'Regional Tax' },
	{ id: 7, type: 'Federal Tax' },
];

const modifierOptions = drop(1, allOptions); // removes first option

// need to change these based on site i18n config
const currencySign = '$';
const currencySignB4 = true;
// const decimalMark = '.';
// const thousandsSep = ',';
const percentSign = '%';

const b4Total = currencySignB4 ? currencySign : '';
const aftTotal = currencySignB4 ? '' : currencySign;

const TicketPriceCalculatorForm = ({ prices }) => {
	const newRow = {
		id: 'NEW_PRICE',
		priceId: null,
		amount: null,
		desc: '',
		isBasePrice: false,
		isDeleted: false,
		isDefault: false,
		isDiscount: false,
		isPercent: false,
		name: '',
		priceType: 5,
		order: 999,
		wpUser: 1,
	};
	const renderPriceRow = (price, btn = 'trash') => {
		const options = price.priceType === 1 ? allOptions : modifierOptions;
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
		if (price.priceType > 1 && btn === 'trash') {
			actions.push(<Button icon={'trash'} onClick={deletePrice} minimal />);
		}
		if (btn === 'add') {
			actions.push(<Button icon={'insert'} onClick={addNewPrice} minimal />);
		}
		return (
			<tr>
				<td width={'7.5%'} style={cellStyle}>
					{price.priceId}
				</td>
				<td width={'15%'} style={cellStyle}>
					<Field
						component={'select'}
						initialValue={price.priceType}
						name={`[prices][${price.id}][type]`}
						disabled={price.priceType === 1}
						style={inputStyle}
					>
						{options.map((option) => (
							<option key={option.id} value={option.id}>
								{option.type}
							</option>
						))}
					</Field>
				</td>
				<td width={'20%'} style={cellStyle}>
					<Field
						type={'text'}
						component={'input'}
						initialValue={price.name}
						name={`[prices][${price.id}][name]`}
						placeholder={'label...'}
						style={inputStyle}
					/>
				</td>
				<td width={'30%'} style={cellStyle}>
					<Field
						type={'text'}
						component={'input'}
						initialValue={price.desc}
						name={`[prices][${price.id}][desc]`}
						placeholder={'description...'}
						style={inputStyle}
					/>
				</td>
				<td width={'15%'} style={amountStyle}>
					<div style={moneyStyle}>
						<div style={b4Style}>{b4Price}</div>
						<div style={CurrencyStyle}>
							<Field
								type={'number'}
								component={'input'}
								initialValue={price.amount}
								name={`[prices][${price.id}][amount]`}
								placeholder={'amount...'}
								style={{ margin: '0 auto', textAlign: 'right', maxWidth: '105px' }}
							/>
						</div>
						<div style={aftStyle}>{afterPrice}</div>
					</div>
				</td>
				<td width={'7.5%'} style={actionsStyle}>
					{actions}
				</td>
			</tr>
		);
	};
	const renderPriceRowWithDelete = (price) => renderPriceRow(price, 'trash');

	return (
		<>
			<H2 style={hdrStyle}>Ticket Price Calculator</H2>
			<div style={divStyle}>
				<HTMLTable interactive striped style={tableStyle}>
					<thead>
						<tr>
							<th width={'7.5%'} style={cellStyle}>
								ID
							</th>
							<th width={'15%'} style={typeStyle}>
								Price Type
							</th>
							<th width={'20%'} style={cellStyle}>
								Label
							</th>
							<th width={'30%'} style={cellStyle}>
								Description
							</th>
							<th width={'15%'} style={amountStyle}>
								Amount
							</th>
							<th width={'7.5%'} style={cellStyle}>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{prices.map(renderPriceRowWithDelete)}
						{renderPriceRow(newRow, 'add')}
					</tbody>
					<tfoot>
						<tr>
							<th colSpan={4} width={'77.5%'} style={{ fontSize: '18px', textAlign: 'right' }}>
								Total
							</th>
							<th width={'15%'} style={amountStyle}>
								<div style={moneyStyle}>
									<div style={b4Style}>{b4Total}</div>
									<div style={CurrencyStyle}>
										<Field
											type={'number'}
											component={'input'}
											initialValue={null}
											name={`[prices][TOTAL][amount]`}
											style={{ margin: '0 auto', textAlign: 'right', maxWidth: '105px' }}
										/>
									</div>
									<div style={aftStyle}>{aftTotal}</div>
								</div>
							</th>
							<th width={'7.5%'} style={actionsStyle}></th>
						</tr>
					</tfoot>
				</HTMLTable>
			</div>
		</>
	);
};

export default TicketPriceCalculatorForm;
