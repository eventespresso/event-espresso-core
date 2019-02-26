import { TextInput, Button, Spinner } from '@wordpress/components';
import { Fragment, Component } from '@wordpress/element';
import { withState } from '@wordpress/compose';
import { withSelect, withDispatch, compose } from '@wordpress/data';

class EventInput extends Component {
	constructor( props ) {
		super( props );
		this.state = { eventId: 0 };
	}

	setEventId = ( event ) => {
		this.setState( { eventId: event.target.value } );
	};

	onEventSubmit = () => this.props.onEventClick( this.state.eventId );

	render() {
		return <div>
			<TextInput
				label={ 'Enter the EventId here' }
				value={ this.state.eventId }
				onChange={ this.setEventId }
			/>
			<Button
				label={ 'Retrieve Event' }
				isPrimary={ true }
				onClick={ this.onEventSubmit }
			/>
		</div>;
	}
}

const DateAndTicketList = ( { eventId = 0, datetimes, tickets, onDateClone } ) => {
	function getDatetimesList() {
		if ( datetimes.length > 0 ) {
			return datetimes.map( ( datetime ) => <li key={ datetime.id }>
				{ datetime.start.toFormat() }
				<br />
				<CloneDateTimeButton datetime={ datetime } onClick={ onDateClone } />
			</li> );
		}
		return <li><Spinner /></li>;
	}
	function getTicketsList() {
		if ( tickets.length > 0 ) {
			return tickets.map( ( ticket ) => <li key={ ticket.id }>{ ticket.name }</li> );
		}
		return <li><Spinner /></li>;
	}
	return <div>
		<div>
			<h2>Datetimes List</h2>
			<ul>{ getDatetimesList() }</ul>
		</div>
		<div>
			<h2>Tickets List</h2>
			<ul>{ getTicketsList() }</ul>
		</div>
	</div>;
};

const DatetimeAndTicketList = compose( [
	withSelect( ( select, ownProps ) => {
		const { datetimes: prevDatetimes, tickets: prevTickets }
	} );
] )

const CloneDateTimeButton = ( { onCloneDateTime } ) => {
	return <Button onClick={ onCloneDateTime } label={ 'Clone Datetime' } />;
};


const Main = ( { eventId, setState } ) => {
	return <div>
		<EventInput onClick={ ( id ) => setState( { eventId: id } ) } />
		<DatetimeAndTicketList eventId={ eventId } />
	</div>;
}

export default withState( { eventId: 0 } )( Main );