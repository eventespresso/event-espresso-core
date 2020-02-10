/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import useEditorInitialization from '../hooks/useEditorInitialization';
import DatesList from './datetimes/datesList';
import TicketsList from './tickets/ticketsList';
import { EditorModal } from '../../shared/ui/editorModal';
import { useStatus, TypeName } from '../../../application/services/apollo/status';
import EspressoForm from '@application/ui/forms/ee-form';

const EventEditor: React.FC = () => {
	// useEditorInitialization();

	// const { isLoaded } = useStatus();

	return (
		<>
			<EspressoForm />
			{/* {isLoaded(TypeName.datetimes) && <EditorModal />} */}
			{/* <DatesList /> */}
			{/* <TicketsList /> */}
		</>
	);
};

export default EventEditor;
