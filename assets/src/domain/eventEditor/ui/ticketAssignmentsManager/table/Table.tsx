import React from 'react';
import { __ } from '@wordpress/i18n';

import getBodyRows from './getBodyRows';
import getHeaderRows from './getHeaderRows';
import { ResponsiveTable } from '@appLayout/espressoTable';

import './styles.scss';

const Table: React.FC<any> = ({ datetimes, tickets }) => {
	const bodyRows = getBodyRows({ datetimes, tickets });
	const headerRows = getHeaderRows(tickets);

	return (
		<ResponsiveTable
			bodyRows={bodyRows}
			headerRows={headerRows}
			metaData={{
				tableId: 'ticket-assignment-manager',
				tableCaption: __('Ticket Assignment Manager', 'event_espresso'),
			}}
		/>
	);
};

export default Table;
