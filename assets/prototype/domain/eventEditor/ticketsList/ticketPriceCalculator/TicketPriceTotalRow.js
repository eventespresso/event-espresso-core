import {Field} from 'react-final-form';
import {Button} from '@blueprintjs/core';
// just temporary
import styles from './inlineStyles';

// need to change these based on site i18n config
const currencySign = '$';
const currencySignB4 = true;
const decimalPlaces = 2;
// const decimalMark = '.';
// const thousandsSep = ',';

const  formatPriceAmount = (amount) => amount === undefined ? '' : Number.parseFloat(amount).toFixed(decimalPlaces);

const b4Total = currencySignB4 ? currencySign : '';
const aftTotal = currencySignB4 ? '' : currencySign;

const TicketPriceTotalRow = ({ ticket, calcDir, toggleCalcDir }) => {
	const reverseCalculate = calcDir ?
		<Button icon={'double-chevron-up'} onClick={toggleCalcDir} value={calcDir} minimal/> :
		<Button icon={'double-chevron-down'} onClick={toggleCalcDir} value={calcDir} minimal/>;
	return (
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
							style={styles.number}
							disabled={ ! calcDir}
							format={formatPriceAmount}
							formatOnBlur
						/>
					</div>
					<div style={styles.aft}>{aftTotal}</div>
				</div>
			</th>
			<th width={'7.5%'} style={styles.actions}>{reverseCalculate}</th>
		</tr>
	);
};

export default TicketPriceTotalRow;
