import { Callout, H3, H6, NonIdealState, Spinner } from '@blueprintjs/core/lib/esm';
import AddNewTicketButton from './AddNewTicketButton';
import TicketCard from './ticketCard/TicketCard';

const boxStyle = {
	padding: '2rem',
	textAlign: 'center',
	width: '100%'
};

const hdrStyle = {
	color: 'grey',
	margin: '1rem 0 0'
};

const listStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-between',
	width: '100%'
};

const emptyStyle = {
	margin: '0 0 2rem',
	padding: '0 0 2rem',
	width: '100%'
};

const btnRowStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'flex-end',
	margin: '0 0 2rem',
	width: '100%'
};

const TicketsList = ({ tickets, error, loading }) => {
	console.log( '%c TicketsList', 'color: gold; font-size: 14px;' );
	console.log( '%c > tickets:', 'color: goldenrod;', tickets );
	console.log( '%c > loading:', 'color: goldenrod;', loading );
	console.log( '%c > error:', 'color: goldenrod;', error );
	const header = <H3 style={{ margin: '2rem 0 1rem' }}>{'Tickets List'}</H3>;

	if ( loading ) {
		return (
			<>
				{ header }
				<Callout style={ boxStyle }>
					<Spinner size={ Spinner.SIZE_SMALL }/>
					<H6 style={ hdrStyle }>{ 'loading tickets...' }</H6>
				</Callout>
			</>
		);
	}
	if ( error ) {
		return (
			<>
				{ header }
				<Callout style={ boxStyle }>
					<NonIdealState
						icon={ 'warning-sign' }
						title={ error.code }
						description={ error.message }
					/>
				</Callout>
			</>
		);
	}

	const btnRow = (
		<div style={btnRowStyle}>
			<AddNewTicketButton />
		</div>
	);

	const ticketList = Array.isArray( tickets ) && tickets.length ? (
		<>
			<div style={listStyle}>
				{tickets.map((ticket) => (
					<TicketCard key={ticket.id} ticket={ticket} />
				))}
			</div>
			{btnRow}
		</>
	) : (
		<>
			<Callout style={emptyStyle}>
				<NonIdealState
					icon={'help'}
					title={'NO TICKETS FOR YOU !!!'}
					description={
						"it's almost like... we haven't" +
						' added any yet or something ?!?!'
					}
				/>
			</Callout>
			{btnRow}
		</>
	);

	return (
		<div>
			{header}
			{ticketList}
		</div>
	);
};

export default TicketsList;
