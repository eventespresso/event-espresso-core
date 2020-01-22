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

const EventEditor: React.FC = (): JSX.Element => {
	useInitQueries();

	return (
		<>
			<EditorModal />
			<DatesList />
			<TicketsList />
		</>
	);
};

export default EventEditor;
