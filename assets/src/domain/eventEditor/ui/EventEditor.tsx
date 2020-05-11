import React from 'react';

import { DatesList } from './datetimes/datesList';
import { FormModal } from '../../shared/ui/formModal';
import { TicketsList } from './tickets/ticketsList';

import { initToaster } from '@appServices/toaster';
import { useEditorInitialization } from '../hooks';
import { useStatus, TypeName } from '@appServices/apollo/status';

import './styles.scss';

const EventEditor: React.FC = () => {
	useEditorInitialization();

	initToaster();

	const { isLoaded } = useStatus();
	return (
		<>
			{isLoaded(TypeName.datetimes) && <FormModal />}
			<DatesList />
			<TicketsList />
		</>
	);
};

export default EventEditor;
