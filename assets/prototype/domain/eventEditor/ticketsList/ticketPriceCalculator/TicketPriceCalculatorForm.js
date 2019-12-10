import { FieldArray } from 'react-final-form-arrays';
import { H2, HTMLTable } from '@blueprintjs/core';

import TicketPriceModifierRow from './TicketPriceModifierRow';
import TicketPriceTotalRow from './TicketPriceTotalRow';

// just temporary
import styles from './inlineStyles';

const TicketPriceCalculatorForm = ({ form, values: { ticket, prices } }) => {
	const calcDir = !!ticket.reverseCalculate;
	const toggleCalcDir = () => form.mutators.toggleCalcDir('ticket.reverseCalculate');
	const ticketName = ticket.name ? ` for Ticket: ${ticket.name} ` : '';
	return (
		<>
			<H2 style={styles.hdr}>
				{`Ticket Price Calculator${ticketName}`}
			</H2>
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
								return fields.map((name, index) => {
									const price = fields.value[index];
									return price && price.id ? (
										<TicketPriceModifierRow
											key={price.id}
											index={index}
											name={name}
											fields={fields}
											price={price}
											calcDir={calcDir}
										/>
									) : null;
								});
							}}
						</FieldArray>
					</tbody>
					<tfoot>
						<TicketPriceTotalRow ticket={ticket} calcDir={calcDir} toggleCalcDir={toggleCalcDir} />
					</tfoot>
				</HTMLTable>
			</div>
		</>
	);
};

export default TicketPriceCalculatorForm;
