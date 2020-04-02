import React from 'react';
import { __ } from '@wordpress/i18n';

import { DebugInfo } from '@appDisplay/index';
import Table from './table/Table';
import TicketPriceModifierRowIterator from './TicketPriceModifierRowIterator';
import TicketPriceTotalRow from './TicketPriceTotalRow';
import { useDataState } from '../data';
import { useInitStateListeners } from '../stateListeners';

import styles from '../inlineStyles';
import './styles.scss';

const TicketPriceCalculator: React.FC = () => {
	// initialize state listeners
	useInitStateListeners();

	const dataState = useDataState();

	return <Table prices={dataState.prices} />;
	return (
		<>
			<div className='ee-tpc' style={styles.div}>
				<table style={styles.table}>
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
				</table>
			</div>
			<DebugInfo data={dataState} />
		</>
	);
};

export default TicketPriceCalculator;
