import React from 'react';
import { __ } from '@wordpress/i18n';

import { ResponsiveTable } from '@appLayout/espressoTable';

import footerRowsGenerator from './footerRowsGenerator';
import headerRowGenerator from './headerRowGenerator';
import bodyRowGenerator from './bodyRowGenerator';
import { TableProps } from '../../data/types';
import useConfig from '@appServices/config/useConfig';
import { useDataState } from '../../data';
import { useMoneyDisplay } from '@appServices/utilities/money';

import './styles.scss';

const Table: React.FC<TableProps> = ({ prices }) => {
	const config = useConfig();
	const { formatAmount } = useMoneyDisplay();
	const { reverseCalculate, toggleCalcDir } = useDataState();
	const signB4 = config?.currency?.signB4;
	const bodyRows = prices.map((price, index) => bodyRowGenerator({ index, price }));
	const footerRow = footerRowsGenerator({ formatAmount, reverseCalculate, toggleCalcDir });
	const headerRow = headerRowGenerator({ signB4 });

	return (
		<ResponsiveTable
			bodyRows={bodyRows}
			className={{ tableClassName: 'ee-ticket-price-calculator' }}
			footerRows={[footerRow]}
			headerRows={[headerRow]}
			metaData={{
				tableId: 'date-entities-table-view',
				tableCaption: __('Event Dates'),
			}}
		/>
	);
};

export default React.memo(Table);
