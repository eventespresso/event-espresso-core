import React from 'react';
import { __ } from '@wordpress/i18n';

import useGetBodyRows from './useGetBodyRows';
import useGetHeaderRows from './useGetHeaderRows';
import { ResponsiveTable } from '@appLayout/espressoTable';
import { DatesAndTickets } from '../../types';

import './styles.scss';

const Table: React.FC<DatesAndTickets> = ({ datetimes, tickets }) => {
	const bodyRows = useGetBodyRows({ datetimes, tickets });
	const headerRows = useGetHeaderRows(tickets);

	return (
		<ResponsiveTable
			bodyRows={bodyRows}
			headerRows={headerRows}
			metaData={{
				tableId: 'ticket-assignment-manager-table',
				tableCaption: __('Ticket Assignment Manager'),
			}}
		/>
	);
};

export default Table;
