import React from 'react';
import { Field } from 'react-final-form';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { TpcFormElement } from './types';
import { useMoneyDisplay } from '../../../../../application/services/utilities/money';

// just temporary
import styles from './inlineStyles';

const TicketPriceTotalRow: React.FC<TpcFormElement> = ({ ticket, reverseCalculate, toggleCalcDir }) => {
	const { afterAmount, beforeAmount, formatAmount } = useMoneyDisplay();
	const calcDirIcon = reverseCalculate ? 'up-circle' : 'down-circle';
	const reverseCalc = reverseCalculate ? 'true' : 'false';
	return (
		<tr>
			<th colSpan={4} style={styles.total}>
				{__('Total')}
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
				<EspressoButton icon={calcDirIcon} onClick={toggleCalcDir} />
			</th>
		</tr>
	);
};

export default TicketPriceTotalRow;
