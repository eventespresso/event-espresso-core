import React from 'react';

import {useStatus, TypeName} from '@appServices/apollo/status';
import {DatesList} from './datetimes/datesList';
import {TicketsList} from './tickets/ticketsList';
import {useEditorInitialization} from '../hooks';
import {FormModal} from '../../shared/ui/formModal';
import ManualToaster from '@appServices/toaster/ManualToaster';
import './styles.scss';

const EventEditor: React.FC = () => {
	useEditorInitialization();
	const {isLoaded} = useStatus();
	return (
		<>
			{isLoaded(TypeName.datetimes) && <FormModal />}
			<ManualToaster />
			<DatesList />
			<TicketsList />
		</>
	);
};

export default EventEditor;
