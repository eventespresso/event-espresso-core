import React from 'react';

import { DatesList } from './datetimes/datesList';
import { FormModal } from '../../shared/ui/formModal';
import ManualToaster from '@appServices/toaster/ManualToaster';
import { TicketsList } from './tickets/ticketsList';
import { toast } from 'react-toastify';

import { useEditorInitialization } from '../hooks';
import { useStatus, TypeName } from '@appServices/apollo/status';

import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

toast.configure({
	autoClose: 4000,
	hideProgressBar: true,
	//etc you get the idea
});

const EventEditor: React.FC = () => {
	useEditorInitialization();
	const { isLoaded } = useStatus();
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
