import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { H2, HTMLTable } from '@blueprintjs/core';

import TicketPriceModifierRowIterator from './TicketPriceModifierRowIterator';
import TicketPriceTotalRow from './TicketPriceTotalRow';

// just temporary
import styles from './inlineStyles';

const TicketPriceCalculatorForm = ({ form, values: { ticket } }): React.ReactNode => {
	const reverseCalculate = !!ticket.reverseCalculate;
	const toggleCalcDir = () => form.mutators.toggleCalcDir('ticket.reverseCalculate');
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
						<FieldArray name={'prices'} children={TicketPriceModifierRowIterator} />
					</tbody>
					<tfoot>
						<TicketPriceTotalRow
							ticket={ticket}
							reverseCalculate={reverseCalculate}
							toggleCalcDir={toggleCalcDir}
						/>
					</tfoot>
				</HTMLTable>
			</div>
		</>
	);
};

export default TicketPriceCalculatorForm;
