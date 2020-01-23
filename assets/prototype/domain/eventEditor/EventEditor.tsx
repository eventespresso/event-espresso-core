/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import useInitQueries from './data/initialization/useInitQueries';
import DatesList from './datetimes/datesList';
import TicketsList from './tickets/ticketsList';
import { EditorModal } from '../shared/editorModal';
import { useStatus, TypeName } from '../../application/services/apollo/status';

const EventEditor: React.FC = (): JSX.Element => {
	useInitQueries();
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
