import React from 'react';

import { DatesList } from './datetimes/datesList';
import { FormModal } from '../../shared/ui/formModal';
import { TicketsList } from './tickets/ticketsList';
import { toast } from 'react-toastify';

import { useEditorInitialization } from '../hooks';
import { useStatus, TypeName } from '@appServices/apollo/status';

import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

toast.configure({
	autoClose: 3000,
	className: 'ee-toaster-notice__container',
	hideProgressBar: true,
});

const EventEditor: React.FC = () => {
	useEditorInitialization();
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
