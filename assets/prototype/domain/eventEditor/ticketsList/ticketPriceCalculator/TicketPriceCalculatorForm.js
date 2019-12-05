import { Field } from 'react-final-form';
import { Button, H2, HTMLTable } from '@blueprintjs/core';
import { FieldArray } from 'react-final-form-arrays'

// import TicketPriceCalculator from './TicketPriceCalculator';
import TicketPriceModifierRow from './TicketPriceModifierRow';

// just temporary
import styles from './inlineStyles';

// actions that need replacing with mutations
const recalculateBasePrice = () => console.log('%c recalculateBasePrice', 'color: red;' /*price.id*/);
const recalculateTotalPrice = () => console.log('%c recalculateTotalPrice', 'color: red;' /*price.id*/);

function financial(x) {
	return Number.parseFloat(x).toFixed(2);
}

// need to change these based on site i18n config
const currencySign = '$';
const currencySignB4 = true;
// const decimalMark = '.';
// const thousandsSep = ',';

const b4Total = currencySignB4 ? currencySign : '';
const aftTotal = currencySignB4 ? '' : currencySign;

const TicketPriceCalculatorForm = ({ form, values: { ticket, prices } }) => {
	const calcDir = !! ticket.reverseCalculate;
	const toggleCalcDir = () => form.mutators.toggleCalcDir('ticket.reverseCalculate');
	const reverseCalculate = calcDir ?
		<Button icon={'double-chevron-up'} onClick={toggleCalcDir} value={calcDir} minimal /> :
		<Button icon={'double-chevron-down'} onClick={toggleCalcDir} value={calcDir} minimal />;
	return (
		<>
			<H2 style={styles.hdr}>Ticket Price Calculator</H2>
			<div style={styles.div}>
				<HTMLTable interactive striped style={styles.table}>
					<thead>
						<tr>
							<th width={'7.5%'} style={styles.cell}>
								ID
							</th>
							<th width={'15%'} style={styles.type}>
								Price Type
							</th>
							<th width={'20%'} style={styles.cell}>
								Label
							</th>
							<th width={'30%'} style={styles.cell}>
								Description
							</th>
							<th width={'15%'} style={styles.amount}>
								Amount
							</th>
							<th width={'7.5%'} style={styles.cell}>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						<FieldArray name={'prices'} initialValue={prices}>
							{({ fields }) => {
								console.log( '%c FIELDS: ', 'color: lightseagreen;', fields );
								return fields.map((name, index) => {
									const price = fields.value[index];
									return price ? (
										<TicketPriceModifierRow
											key={price.id}
											index={index}
											name={name}
											fields={fields}
											price={price}
											reverseCalculate={calcDir}
										/>
									) : null
								});
							}}
						</FieldArray>
					</tbody>
					<tfoot>
						<tr>
							<th colSpan={4} width={'77.5%'} style={{ fontSize: '18px', textAlign: 'right' }}>
								Total
							</th>
							<th width={'15%'} style={styles.amount}>
								<div style={styles.money}>
									<div style={styles.b4}>{b4Total}</div>
									<div style={styles.Currency}>
										<Field
											type={'hidden'}
											component={'input'}
											initialValue={ticket.id}
											name={'ticket.id'}
										/>
										<Field
											type={'hidden'}
											component={'input'}
											initialValue={ticket.reverseCalculate ? 'true' : 'false'}
											name={'ticket.reverseCalculate'}
										/>
										<Field
											type={'number'}
											component={'input'}
											initialValue={ticket.price}
											name={'ticket.price'}
											style={{ margin: '0 auto', textAlign: 'right', maxWidth: '105px' }}
											disabled={!calcDir}
										/>
									</div>
									<div style={styles.aft}>{aftTotal}</div>
								</div>
							</th>
							<th width={'7.5%'} style={styles.actions}>{reverseCalculate}</th>
						</tr>
					</tfoot>
				</HTMLTable>
			</div>
		</>
	);
};

export default TicketPriceCalculatorForm;
