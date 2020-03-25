import React, { Suspense } from 'react';

import { useEditorInitialization } from '../hooks';
import { FormModal } from '../../shared/ui/formModal';
import { useStatus, TypeName } from '@appServices/apollo/status';
import { LoadingNotice } from '@appDisplay/loadingNotice';
import './styles.css';

const DatesList = React.lazy(() => import(/* webpackChunkName: "dates-list" */ './datetimes/datesList'));

const TicketsList = React.lazy(() => import(/* webpackChunkName: "tickets-list" */ './tickets/ticketsList'));

const EventEditor: React.FC = () => {
	useEditorInitialization();

	const { isLoaded } = useStatus();

	return (
		<>
			{isLoaded(TypeName.datetimes) && <FormModal />}
			<Suspense fallback={<LoadingNotice />}>
				<DatesList />
			</Suspense>
			<Suspense fallback={<LoadingNotice />}>
				<TicketsList />
			</Suspense>
		</>
	);
};

export default EventEditor;
