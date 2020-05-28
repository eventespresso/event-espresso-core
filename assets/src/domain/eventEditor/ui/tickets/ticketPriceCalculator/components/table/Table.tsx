import React, { useMemo } from 'react';
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
import { useMemoStringify } from '@application/services/hooks';

const Table: React.FC<TableProps> = ({ prices }) => {
	const config = useConfig();
	const { formatAmount } = useMoneyDisplay();
	const { reverseCalculate, toggleCalcDir } = useDataState();
	const signB4 = config?.currency?.signB4;

	const bodyRowGenerator = useBodyRowGenerator();
	const footerRowGenerator = useFooterRowGenerator();
	const headerRowGenerator = useHeaderRowGenerator();

	const bodyRows = useMemo(() => prices.map((price, index) => bodyRowGenerator({ index, price })), [
		bodyRowGenerator,
		prices,
	]);

	const footerRows = useMemo(() => {
		const footerRow = footerRowGenerator({ formatAmount, reverseCalculate, toggleCalcDir });
		return [footerRow];
	}, [footerRowGenerator, formatAmount, reverseCalculate, toggleCalcDir]);

	const headerRows = useMemo(() => {
		const headerRow = headerRowGenerator({ signB4 });
		return [headerRow];
	}, [headerRowGenerator, signB4]);

	const className = useMemoStringify({ tableClassName: 'ee-ticket-price-calculator' });
	const metaData = useMemoStringify({
		tableId: 'ticket-price-calculator-table',
		tableCaption: __('Ticket Price Calculator'),
	});

	return (
		<ResponsiveTable
			bodyRows={bodyRows}
			className={className}
			footerRows={footerRows}
			headerRows={headerRows}
			metaData={metaData}
		/>
	);
};

export default React.memo(Table);
