/**
 * External dependencies
 */
import React from 'react';
import { H3 } from '@blueprintjs/core/lib/esm';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import AddNewTicketButton from './AddNewTicketButton';
import { Ticket } from '../../data/types';
import TicketListFilterBar from './filterBar/TicketListFilterBar';
import TicketCard from '../ticketCard/TicketCard';

const listStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-between',
	width: '100%',
};

interface ListProps {
	tickets: Ticket[];
}

const List: React.FC<ListProps> = ({ tickets }): JSX.Element => {
	const header = <H3 style={{ margin: '2rem 0 .5rem' }}>{__('Tickets List')}</H3>;

	const ticketList = (
		<>
			<div style={listStyle}>
				{tickets.map((ticket) => (
					<TicketCard id={ticket.id} key={ticket.id} />
				))}
			</div>
			<AddNewTicketButton />
		</>
	);

	return (
		<div style={{ margin: '0 0 2rem' }}>
			{header}
			<TicketListFilterBar />
			{ticketList}
		</div>
	);
};

export default List;
