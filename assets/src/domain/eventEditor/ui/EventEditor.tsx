import React from 'react';

import { DatesList } from './datetimes/datesList';
import { TicketsList } from './tickets/ticketsList';

import { initToaster } from '@appServices/toaster';
import { useEditorInitialization } from '../hooks';

import './styles.scss';

const EventEditor: React.FC = () => {
	useEditorInitialization();

	initToaster();

	return (
		<>
			<DatesList />
			<TicketsList />
		</>
	);
};

export default EventEditor;
