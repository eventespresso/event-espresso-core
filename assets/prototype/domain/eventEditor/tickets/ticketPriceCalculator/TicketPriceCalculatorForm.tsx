import React from 'react';
import { H2, HTMLTable } from '@blueprintjs/core';
import { __, sprintf } from '@wordpress/i18n';

import TicketPriceModifierRowIterator from './TicketPriceModifierRowIterator';
import TicketPriceTotalRow from './TicketPriceTotalRow';
import { TpcForm } from './types';

// just temporary
import styles from './inlineStyles';

const TicketPriceCalculatorForm: React.FC<TpcForm> = ({ form, values: { ticket } }): JSX.Element => {
	const reverseCalculate = Boolean(ticket.reverseCalculate);
	const toggleCalcDir = (): void => form.mutators.toggleCalcDir();
	return (
		<>
			<H2 style={styles.hdr}>{sprintf(__('Price Calculator for Ticket.: %s'), ticket.name)}</H2>
			<div style={styles.div}>
				<HTMLTable interactive striped style={styles.table}>
					<thead>
						<tr>
							<th style={{ ...styles.colWidth7h, ...styles.cell }}>{__('ID')}</th>
							<th style={{ ...styles.colWidth15, ...styles.type }}>{__('Price Type')}</th>
							<th style={{ ...styles.colWidth20, ...styles.cell }}>{__('Label')}</th>
							<th style={{ ...styles.colWidth30, ...styles.cell }}>{__('Description')}</th>
							<th style={{ ...styles.colWidth15, ...styles.amount }}>{__('Amount')}</th>
							<th style={{ ...styles.colWidth7h, ...styles.actions }}>{__('Actions')}</th>
						</tr>
					</thead>
					<tbody>
						<TicketPriceModifierRowIterator reverseCalculate={reverseCalculate} />
					</tbody>
					<tfoot>
						<TicketPriceTotalRow
							reverseCalculate={reverseCalculate}
							ticket={ticket}
							toggleCalcDir={toggleCalcDir}
						/>
					</tfoot>
				</HTMLTable>
			</div>
		</>
	);
};

export default TicketPriceCalculatorForm;
