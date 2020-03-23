import React from 'react';
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { useMoneyDisplay, parsedAmount } from '@appServices/utilities/money';
import { useDataState } from '../data';
import { TicketPriceField } from '../fields';

// just temporary
import styles from '../inlineStyles';

const TicketPriceTotalRow: React.FC = () => {
	const { afterAmount, beforeAmount, formatAmount } = useMoneyDisplay();
	const { reverseCalculate, toggleCalcDir } = useDataState();
	const calcDirIcon = reverseCalculate ? <UpCircleOutlined /> : <DownCircleOutlined />;

	return (
		<tr>
			<th colSpan={4} style={styles.total}>
				{__('Total')}
			</th>
			<th style={{ ...styles.colWidth15, ...styles.amount }}>
				<div style={styles.money}>
					<div style={styles.b4}>{beforeAmount}</div>
					<div style={styles.currency}>
						<TicketPriceField
							component='input'
							type={'number'}
							style={styles.number}
							disabled={!reverseCalculate}
							format={(price) => formatAmount(price) || ''}
							parse={(price) => parsedAmount(price)}
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
