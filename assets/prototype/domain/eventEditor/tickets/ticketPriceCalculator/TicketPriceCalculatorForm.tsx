import React from 'react';
import { H2, HTMLTable } from '@blueprintjs/core';

import TicketPriceModifierRowIterator from './TicketPriceModifierRowIterator';
import TicketPriceTotalRow from './TicketPriceTotalRow';
import { TpcForm } from './types';

// just temporary
import styles from './inlineStyles';

const TicketPriceCalculatorForm: React.FC<TpcForm> = ({ form, values: { ticket } }): JSX.Element => {
	const reverseCalculate = Boolean(ticket.reverseCalculate);
	const toggleCalcDir = (): void => form.mutators.toggleCalcDir();
	const ticketName = ticket.name ? ` for Ticket: ${ticket.name} ` : '';
	return (
		<>
			<H2 style={styles.hdr}>{`Ticket Price Calculator${ticketName}`}</H2>
			<div style={styles.div}>
				<HTMLTable interactive striped style={styles.table}>
					<thead>
						<tr>
							<th style={{ ...styles.colWidth7h, ...styles.cell }}>ID</th>
							<th style={{ ...styles.colWidth15, ...styles.type }}>Price Type</th>
							<th style={{ ...styles.colWidth20, ...styles.cell }}>Label</th>
							<th style={{ ...styles.colWidth30, ...styles.cell }}>Description</th>
							<th style={{ ...styles.colWidth15, ...styles.amount }}>Amount</th>
							<th style={{ ...styles.colWidth7h, ...styles.actions }}>Actions</th>
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
