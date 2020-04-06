import React from 'react';
import { __ } from '@wordpress/i18n';

import { ResponsiveTable } from '@appLayout/espressoTable';

import useBodyRowGenerator from './useBodyRowGenerator';
import useFooterRowGenerator from './useFooterRowGenerator';
import useHeaderRowGenerator from './useHeaderRowGenerator';
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

	const bodyRowGenerator = useBodyRowGenerator();
	const footerRowGenerator = useFooterRowGenerator();
	const headerRowGenerator = useHeaderRowGenerator();

	const bodyRows = prices.map((price, index) => bodyRowGenerator({ index, price }));
	const footerRow = footerRowGenerator({ formatAmount, reverseCalculate, toggleCalcDir });
	const headerRow = headerRowGenerator({ signB4 });

	return (
		<ResponsiveTable
			bodyRows={bodyRows}
			className={{ tableClassName: 'ee-ticket-price-calculator' }}
			footerRows={[footerRow]}
			headerRows={[headerRow]}
			metaData={{
				tableId: 'ticket-price-calculator-table',
				tableCaption: __('Ticket Price Calculator'),
			}}
		/>
	);
};

export default React.memo(Table);
