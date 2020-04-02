import React from 'react';
import { __ } from '@wordpress/i18n';

import { ResponsiveTable } from '@appLayout/espressoTable';

import footerRowsGenerator from './footerRowsGenerator';
import headerRowGenerator from './headerRowGenerator';
import bodyRowGenerator from './bodyRowGenerator';
import useConfig from '@appServices/config/useConfig';

const Table: React.FC = ({ prices }) => {
	const config = useConfig();
	const signB4 = config?.currency?.signB4;
	const bodyRows = prices.map((price, index) => bodyRowGenerator({ index, price }));
	const footerRow = footerRowsGenerator({ signB4 });
	const headerRow = headerRowGenerator({ signB4 });

	return (
		<ResponsiveTable
			bodyRows={bodyRows}
			className={{ tableClassName: 'sasa' }}
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
