import React from 'react';

import useEditorInitialization from '../hooks/useEditorInitialization';
import DatesList from './datetimes/datesList';
import TicketsList from './tickets/ticketsList';
import { EditorModal } from '../../shared/ui/editorModal';
import { useStatus, TypeName } from '../../../application/services/apollo/status';
import './styles.css';

const EventEditor: React.FC = () => {
	useEditorInitialization();

	const { isLoaded } = useStatus();

	return (
		<>
			{isLoaded(TypeName.datetimes) && <EditorModal />}
			<DatesList />
			<TicketsList />
		</>
	);
};

export default EventEditor;
