import React from 'react';
import { HTMLTable } from '@blueprintjs/core';
import { __ } from '@wordpress/i18n';

import { useDataState } from './data';
import { DebugInfo } from '@appDisplay/index';
import TicketPriceModifierRowIterator from './TicketPriceModifierRowIterator';
import TicketPriceTotalRow from './TicketPriceTotalRow';
import styles from './inlineStyles';

const TicketPriceCalculator: React.FC = () => {
	const dataState = useDataState();
	return (
		<>
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
					<tbody>{<TicketPriceModifierRowIterator />}</tbody>
					<tfoot>{<TicketPriceTotalRow />}</tfoot>
				</HTMLTable>
			</div>
			<DebugInfo data={dataState} />
		</>
	);
};

export default TicketPriceCalculator;
