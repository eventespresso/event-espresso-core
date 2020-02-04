/**
 * External dependencies
 */
import React from 'react';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import AddNewTicketButton from './AddNewTicketButton';
import EmptyState from '../../../../application/ui/components/display/EmptyState';
import ErrorIndicator from '../../../../application/ui/components/display/ErrorIndicator';
import LoadingIndicator from '../../../../application/ui/components/display/LoadingIndicator';
import List from './List';
import useTickets from '../../data/queries/tickets/useTickets';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';

const TicketsList: React.FC = (): JSX.Element => {
	const tickets = useTickets();
	const noTickets = tickets.length === 0;
	const { isError, isLoading } = useStatus();
	const error = isError(TypeName.tickets);
	const loading = isLoading(TypeName.datetimes) || isLoading(TypeName.tickets);

	if (loading) return <LoadingIndicator message={__('loading tickets...', 'event_espresso')} />;

	if (error) return <ErrorIndicator />;

	if (noTickets) {
		return (
			<EmptyState
				description={__('try changing filter settings', 'event_espresso')}
				title={__('NO TICKETS FOR YOU !!!', 'event_espresso')}
			>
				<AddNewTicketButton />
			</EmptyState>
		);
	}

	return <List tickets={tickets} />;
};

export default TicketsList;
