/**
 * External dependencies
 */
import * as React from 'react';

/**
 * Internal dependencies
 */
import AddNewTicketButton from './AddNewTicketButton';
import EmptyState from '../../../../application/ui/components/display/EmptyState';
import ErrorIndicator from '../../../../application/ui/components/display/ErrorIndicator';
import LoadingIndicator from '../../../../application/ui/components/display/LoadingIndicator';
import TicketsList from './TicketsList';
import useTickets from '../../data/queries/tickets/useTickets';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';

const TicketsListData = () => {
	const tickets = useTickets();
	const noTickets = tickets.length === 0;
	const { isError, isLoading } = useStatus();
	const error = isError(TypeName.tickets);
	const loading = isLoading(TypeName.datetimes) || isLoading(TypeName.tickets);

	if (loading) return <LoadingIndicator message='loading tickets...' />;

	if (error) return <ErrorIndicator />;

	if (noTickets) {
		return (
			<EmptyState description='try changing filter settings' title='NO TICKETS FOR YOU !!!'>
				<AddNewTicketButton />
			</EmptyState>
		);
	}

	return <TicketsList tickets={tickets} />;
};

export default TicketsListData;
