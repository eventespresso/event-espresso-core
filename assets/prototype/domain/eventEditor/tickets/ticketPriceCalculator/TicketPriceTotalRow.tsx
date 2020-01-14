import React from 'react';
import { Field } from 'react-final-form';
import { Button } from '@blueprintjs/core';

// just temporary
import styles from './inlineStyles';
import { TpcFormElement } from './types';
import { useMoneyDisplay } from '../../../../application/utilities/money';

const TicketPriceTotalRow: React.FunctionComponent<TpcFormElement> = ({
	ticket,
	reverseCalculate,
	toggleCalcDir,
}): JSX.Element => {
	const { afterAmount, beforeAmount, formatAmount } = useMoneyDisplay();
	const calcDirIcon = reverseCalculate ? 'double-chevron-up' : 'double-chevron-down';
	const reverseCalc = reverseCalculate ? 'true' : 'false';
	return (
		<tr>
			<th colSpan={4} style={styles.total}>
				Total
			</th>
			<th style={{ ...styles.colWidth15, ...styles.amount }}>
				<div style={styles.money}>
					<Field type={'hidden'} component={'input'} initialValue={ticket.id} name={'ticket.id'} />
					<div style={styles.b4}>{beforeAmount}</div>
					<div style={styles.currency}>
						<Field
							type={'hidden'}
							component={'input'}
							initialValue={reverseCalc}
							name={'ticket.reverseCalculate'}
						/>
						<Field
							type={'number'}
							component={'input'}
							initialValue={ticket.price}
							name={'ticket.price'}
							style={styles.number}
							disabled={!reverseCalculate}
							format={formatAmount}
							formatOnBlur
						/>
					</div>
					<div style={styles.aft}>{afterAmount}</div>
				</div>
			</th>
			<th style={{ ...styles.colWidth7h, ...styles.actions }}>
				<Button icon={calcDirIcon} onClick={toggleCalcDir} value={reverseCalc} minimal />
			</th>
		</tr>
	);
};

export default TicketPriceTotalRow;
